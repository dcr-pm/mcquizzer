
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
  rank?: number;
  name: string;
  points: number;
  level: number;
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

export type GameScreen = 'welcome' | 'name_entry' | 'category_selection' | 'playing' | 'leaderboard' | 'score';