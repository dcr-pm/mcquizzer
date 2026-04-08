
// =====================
// FREE TIER TYPES
// =====================

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

// =====================
// AUTH & PROFILE
// =====================

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
  is_premium: boolean;
  premium_since: string | null;
  stripe_customer_id: string | null;
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

// =====================
// PREMIUM TIER TYPES
// =====================

export interface CertDomain {
  id: string;
  name: string;
  weight: number;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  domains: CertDomain[];
  passingScore: number;
  examQuestionCount: number;
  examTimeLimitMinutes: number;
}

export interface PremiumQuestion {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  certId: string;
  domainId: string;
  examEligible?: boolean;
}

// =====================
// LEARNING PATHS
// =====================

export interface LearningSlide {
  type: 'context' | 'teach' | 'question';
  title: string;
  // For context/teach slides
  content?: string;
  // For question slides
  question?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
  // Metadata
  domainId: string;
  chapter: number;
}

export interface LearningPathChapter {
  title: string;
  domainId: string;
  icon: string;
}

export interface LearningPath {
  id: string;
  certId: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  gradient: string;
  chapters: LearningPathChapter[];
  slides: LearningSlide[];
}

export interface Flashcard {
  id: string;
  certId: string;
  domainId: string;
  front: string;
  back: string;
}

export interface FlashcardProgress {
  user_id: string;
  flashcard_id: string;
  cert_id: string;
  mastery: 'new' | 'learning' | 'mastered';
  last_reviewed: string;
  review_count: number;
}

export interface DomainScore {
  domainId: string;
  domainName: string;
  correct: number;
  total: number;
  percent: number;
}

export interface ExamResult {
  id?: string;
  certId: string;
  certName: string;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  passingScore: number;
  scorePercent: number;
  domainBreakdown: DomainScore[];
  timeTaken: number;
  completedAt: string;
}

export interface ExamState {
  questions: PremiumQuestion[];
  answers: Map<number, number>;
  flagged: Set<number>;
  currentIndex: number;
  startTime: number;
  timeLimitSeconds: number;
}

// =====================
// NAVIGATION
// =====================

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published_at: string;
  created_at: string;
}

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
}

export interface Testimonial {
  id: string;
  user_id: string;
  display_name: string;
  content: string;
  created_at: string;
}

export type GameScreen =
  | 'auth'
  | 'dashboard'
  | 'profile_edit'
  | 'category_selection'
  | 'playing'
  | 'leaderboard'
  | 'score'
  | 'cert_hub'
  | 'study_mode'
  | 'flashcards'
  | 'exam_setup'
  | 'exam_playing'
  | 'exam_results'
  | 'premium_upgrade'
  | 'sf_news'
  | 'blog'
  | 'home'
  | 'help'
  | 'sf_jobs'
  | 'testimonials'
  | 'feedback'
  | 'learning_path'
  | 'contact';
