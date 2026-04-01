import { supabase } from './supabase.ts';
import { UserProfile, QuizHistoryEntry } from '../types.ts';

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function updateProfile(userId: string, updates: Partial<Pick<UserProfile, 'display_name' | 'avatar_url'>>): Promise<UserProfile | null> {
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
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('points', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as UserProfile[];
}

export async function saveFeedback(userId: string, questionText: string, feedback: string): Promise<void> {
  await supabase.from('feedback').insert({
    user_id: userId,
    question_text: questionText,
    feedback,
  });
}
