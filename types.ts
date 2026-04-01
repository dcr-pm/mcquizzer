
export interface Question {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  questions: Question[];
}

export interface Player {
  id?: string;
  rank?: number;
  name: string;
  points: number;
  level: number;
}

export interface UserProfile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  points: number;
  level: number;
  total_quizzes: number;
  total_correct: number;
  total_questions_answered: number;
  badges: string[];
  created_at: string;
  updated_at: string;
}

export interface QuizHistoryEntry {
  id: string;
  user_id: string;
  category_id: string;
  category_name: string;
  correct_answers: number;
  total_questions: number;
  points_earned: number;
  completed_at: string;
}

export interface Prize {
  points: number;
  name: string;
  icon: string;
  color?: string;
}

export interface SessionStats {
    categoryName: string;
    correctAnswers: number;
    totalQuestions: number;
    pointsEarned: number;
}

export type GameScreen = 'auth' | 'dashboard' | 'profile_edit' | 'category_selection' | 'playing' | 'leaderboard' | 'score';