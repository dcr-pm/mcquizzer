import { supabase, isSupabaseConfigured } from './supabase.ts';
import { UserProfile, QuizHistoryEntry, ExamResult, FlashcardProgress } from '../types.ts';

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function updateProfile(userId: string, updates: Partial<Pick<UserProfile, 'display_name' | 'avatar_url'>>): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function saveQuizResult(
  userId: string,
  result: {
    categoryId: string;
    categoryName: string;
    correctAnswers: number;
    totalQuestions: number;
    pointsEarned: number;
  }
): Promise<void> {
  if (!isSupabaseConfigured) return;

  // Insert quiz history
  await supabase.from('quiz_history').insert({
    user_id: userId,
    category_id: result.categoryId,
    category_name: result.categoryName,
    correct_answers: result.correctAnswers,
    total_questions: result.totalQuestions,
    points_earned: result.pointsEarned,
  });

  // Update profile stats
  const profile = await fetchProfile(userId);
  if (profile) {
    const newPoints = profile.points + result.pointsEarned;
    await supabase
      .from('profiles')
      .update({
        points: newPoints,
        level: Math.floor(newPoints / 100) + 1,
        total_quizzes: profile.total_quizzes + 1,
        total_correct: profile.total_correct + result.correctAnswers,
        total_questions_answered: profile.total_questions_answered + result.totalQuestions,
      })
      .eq('id', userId);
  }
}

export async function fetchQuizHistory(userId: string, limit = 10): Promise<QuizHistoryEntry[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('quiz_history')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as QuizHistoryEntry[];
}

export async function fetchLeaderboard(limit = 50): Promise<UserProfile[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('points', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as UserProfile[];
}

export async function saveFeedback(userId: string, questionText: string, feedback: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.from('feedback').insert({
    user_id: userId,
    question_text: questionText,
    feedback,
  });
}

// =====================
// PREMIUM TIER HELPERS
// =====================

export async function saveExamResult(userId: string, result: ExamResult): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.from('exam_history').insert({
    user_id: userId,
    cert_id: result.certId,
    cert_name: result.certName,
    total_questions: result.totalQuestions,
    correct_answers: result.correctAnswers,
    score_percent: result.scorePercent,
    passed: result.passed,
    passing_score: result.passingScore,
    domain_breakdown: result.domainBreakdown,
    time_taken: result.timeTaken,
    completed_at: result.completedAt,
  });
}

export async function fetchExamHistory(userId: string, certId: string, limit = 5): Promise<ExamResult[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('exam_history')
    .select('*')
    .eq('user_id', userId)
    .eq('cert_id', certId)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map((row: any) => ({
    id: row.id,
    certId: row.cert_id,
    certName: row.cert_name,
    totalQuestions: row.total_questions,
    correctAnswers: row.correct_answers,
    scorePercent: row.score_percent,
    passed: row.passed,
    passingScore: row.passing_score,
    domainBreakdown: row.domain_breakdown,
    timeTaken: row.time_taken,
    completedAt: row.completed_at,
  }));
}

export async function fetchFlashcardProgress(userId: string, certId: string): Promise<FlashcardProgress[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('flashcard_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('cert_id', certId);

  if (error || !data) return [];
  return data as FlashcardProgress[];
}

export async function upsertFlashcardProgress(
  userId: string,
  flashcardId: string,
  certId: string,
  mastery: 'new' | 'learning' | 'mastered'
): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.from('flashcard_progress').upsert(
    {
      user_id: userId,
      flashcard_id: flashcardId,
      cert_id: certId,
      mastery,
      last_reviewed: new Date().toISOString(),
      review_count: 1,
    },
    { onConflict: 'user_id,flashcard_id' }
  );
}

export async function saveStudySession(
  userId: string,
  certId: string,
  domainId: string,
  questionsReviewed: number,
  correctAnswers: number
): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.from('study_history').insert({
    user_id: userId,
    cert_id: certId,
    domain_id: domainId,
    questions_reviewed: questionsReviewed,
    correct_answers: correctAnswers,
  });
}
