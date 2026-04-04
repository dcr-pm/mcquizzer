import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, Category, Question, GameScreen, Prize, SessionStats, Certification, ExamState, ExamResult, PremiumQuestion, FlashcardProgress, DomainScore } from './types.ts';
import { CATEGORIES, PRIZES, QUESTIONS_PER_ROUND, EINSTEIN_CHALLENGE_QUESTIONS } from './constants.ts';
import { ALL_QUESTIONS } from './questions.ts';
import { CERTIFICATIONS } from './data/certifications.ts';
import { PREMIUM_QUESTIONS } from './data/premium-questions.ts';
import { FLASHCARDS } from './data/flashcards.ts';
import { useAuth } from './lib/AuthContext.tsx';
import { saveQuizResult, fetchLeaderboard, saveFeedback, saveExamResult, fetchFlashcardProgress, upsertFlashcardProgress } from './lib/database.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import DashboardScreen from './components/DashboardScreen.tsx';
import ProfileEditScreen from './components/ProfileEditScreen.tsx';
import CategorySelectionScreen from './components/CategorySelectionScreen.tsx';
import QuestionScreen from './components/QuestionScreen.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import PrizeAlert from './components/PrizeAlert.tsx';
import FeedbackModal from './components/FeedbackModal.tsx';
import ScoreScreen from './components/ScoreScreen.tsx';
import PremiumUpgradeScreen from './components/PremiumUpgradeScreen.tsx';
import CertHubScreen from './components/CertHubScreen.tsx';
import StudyModeScreen from './components/StudyModeScreen.tsx';
import FlashcardScreen from './components/FlashcardScreen.tsx';
import ExamSetupScreen from './components/ExamSetupScreen.tsx';
import ExamPlayingScreen from './components/ExamPlayingScreen.tsx';
import ExamResultsScreen from './components/ExamResultsScreen.tsx';
import SFNewsScreen from './components/SFNewsScreen.tsx';
import BlogScreen from './components/BlogScreen.tsx';
import HomeScreen from './components/HomeScreen.tsx';
import HelpScreen from './components/HelpScreen.tsx';
import SFJobsScreen from './components/SFJobsScreen.tsx';
import TestimonialsScreen from './components/TestimonialsScreen.tsx';
import FeedbackScreen from './components/FeedbackScreen.tsx';
import NewsletterModal from './components/NewsletterModal.tsx';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// URL <-> screen mapping
const SCREEN_PATHS: Record<string, GameScreen> = {
  '/': 'home',
  '/quiz': 'category_selection',
  '/dashboard': 'dashboard',
  '/leaderboard': 'leaderboard',
  '/cert-prep': 'cert_hub',
  '/upgrade': 'premium_upgrade',
  '/study': 'study_mode',
  '/flashcards': 'flashcards',
  '/exam': 'exam_setup',
  '/news': 'sf_news',
  '/blog': 'blog',
  '/jobs': 'sf_jobs',
  '/testimonials': 'testimonials',
  '/help': 'help',
  '/feedback': 'feedback',
};

const PATH_FOR_SCREEN: Record<string, string> = {};
for (const [path, scr] of Object.entries(SCREEN_PATHS)) {
  PATH_FOR_SCREEN[scr] = path;
}

const getScreenFromPath = (): GameScreen | null => {
  const path = window.location.pathname;
  return SCREEN_PATHS[path] || null;
};

const App: React.FC = () => {
  const { user, profile, loading: authLoading, signOut, refreshProfile } = useAuth();

  const [screen, setScreen] = useState<GameScreen>('auth');
  const [player, setPlayer] = useState<Player | null>(null);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [questionQueue, setQuestionQueue] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [unlockedPrizes, setUnlockedPrizes] = useState<Prize[]>([]);
  const [prizeAlert, setPrizeAlert] = useState<Prize | null>(null);

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackQuestion, setFeedbackQuestion] = useState<Question | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrectAnswers, setSessionCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // Track the category ID for the current session (needed for saving to DB)
  const sessionCategoryIdRef = useRef<string>('');

  // Premium tier state
  const [currentCert, setCurrentCert] = useState<Certification>(CERTIFICATIONS[0]);
  const [examState, setExamState] = useState<ExamState | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [flashcardProgress, setFlashcardProgress] = useState<FlashcardProgress[]>([]);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const quizCompletionCountRef = useRef(0);

  const currentQuestion = questionQueue[currentQuestionIndex];
  const suppressPushRef = useRef(false);

  // Push URL when screen changes
  useEffect(() => {
    if (screen === 'auth') return;
    if (suppressPushRef.current) { suppressPushRef.current = false; return; }
    const path = PATH_FOR_SCREEN[screen];
    if (path && window.location.pathname !== path) {
      window.history.pushState({ screen }, '', path);
    }
  }, [screen]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const scr = e.state?.screen || getScreenFromPath();
      if (scr && scr !== 'auth') {
        suppressPushRef.current = true;
        setScreen(scr);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync player state from auth profile
  useEffect(() => {
    if (profile) {
      setPlayer({ id: profile.id, name: profile.display_name, points: profile.points, level: profile.level });
      const existingPrizes = PRIZES.filter(prize => profile.points >= prize.points);
      setUnlockedPrizes(existingPrizes);
      if (screen === 'auth') {
        // Check if URL has a target screen
        const urlScreen = getScreenFromPath();
        setScreen(urlScreen && urlScreen !== 'auth' ? urlScreen : 'home');
      }
    } else if (!authLoading && !user) {
      setPlayer(null);
      setScreen('auth');
    }
  }, [profile, user, authLoading]);

  // Load leaderboard from Supabase
  const loadLeaderboard = useCallback(async () => {
    const data = await fetchLeaderboard(50);
    setLeaderboard(data.map((p, i) => ({ id: p.id, name: p.display_name, points: p.points, level: p.level, rank: i + 1 })));
  }, []);

  useEffect(() => {
    if (user) loadLeaderboard();
  }, [user, loadLeaderboard]);

  // Prize unlock effect
  useEffect(() => {
    if (!player) return;

    const unlockedNames = new Set(unlockedPrizes.map(p => p.name));
    const newPrizes = PRIZES.filter(prize =>
      player.points >= prize.points && !unlockedNames.has(prize.name)
    );

    if (newPrizes.length > 0) {
      setUnlockedPrizes(current => [...current, ...newPrizes]);
      if (!prizeAlert) {
         setPrizeAlert(newPrizes[0]);
      }
    }
  }, [player?.points, unlockedPrizes, prizeAlert]);

  const handleSelectCategory = (categoryId: string) => {
    let categoryInfo: Omit<Category, 'questions'> | undefined;
    let questions: Question[] = [];
    let numQuestions = QUESTIONS_PER_ROUND;

    if (categoryId === 'random') {
      categoryInfo = { id: 'random', name: 'Random', description: '', icon: 'fa-shuffle', color: '#777', gradient: 'from-gray-500 to-gray-700' };
      questions = shuffleArray(ALL_QUESTIONS).slice(0, numQuestions);
    } else if (categoryId === 'einstein_challenge') {
      const baseCatInfo = CATEGORIES.find(c => c.id === 'einstein');
      numQuestions = EINSTEIN_CHALLENGE_QUESTIONS;
       if (baseCatInfo) {
        categoryInfo = {...baseCatInfo, name: 'Einstein Challenge' };
        const einsteinQuestions = ALL_QUESTIONS.filter(q => q.categoryId === 'einstein');
        questions = shuffleArray(einsteinQuestions).slice(0, numQuestions);
       }
    } else {
      categoryInfo = CATEGORIES.find(c => c.id === categoryId);
      if (categoryInfo) {
        const categoryQuestions = ALL_QUESTIONS.filter(q => q.categoryId === categoryId);
        questions = shuffleArray(categoryQuestions).slice(0, numQuestions);
      }
    }

    if (categoryInfo && questions.length > 0) {
        sessionCategoryIdRef.current = categoryId;
        setSessionPoints(0);
        setSessionCorrectAnswers(0);
        setCurrentCategory({ ...categoryInfo, questions });
        setQuestionQueue(questions);
        setCurrentQuestionIndex(0);
        setIsAnswered(false);
        setScreen('playing');
    } else {
      alert(`Oops! There are no questions available for this category yet. Please try another one.`);
      setScreen('category_selection');
    }
  };

  const handleAnswer = (isCorrect: boolean, timeLeft: number) => {
    if (!player) return;
    setIsAnswered(true);

    if (isCorrect) {
      const basePoints = 10;
      const timeBonus = Math.floor(timeLeft / 3);
      let totalPoints = basePoints + timeBonus;

      if (currentCategory?.id === 'einstein' || currentCategory?.id === 'einstein_challenge') {
        totalPoints = Math.round(totalPoints * 1.5);
      }

      setPlayer(p => p ? { ...p, points: p.points + totalPoints } : null);
      setSessionPoints(s => s + totalPoints);
      setSessionCorrectAnswers(c => c + 1);
    }
  };

  const handleEndQuiz = async () => {
    if (!currentCategory) return;

    const questionsAttempted = isAnswered ? currentQuestionIndex + 1 : currentQuestionIndex;
    const finalTotalQuestions = questionsAttempted > questionQueue.length ? questionQueue.length : questionsAttempted;

    const stats: SessionStats = {
      categoryName: currentCategory.name,
      pointsEarned: sessionPoints,
      correctAnswers: sessionCorrectAnswers,
      totalQuestions: finalTotalQuestions,
    };

    setSessionStats(stats);
    setScreen('score');

    // Save to Supabase
    if (user && finalTotalQuestions > 0) {
      await saveQuizResult(user.id, {
        categoryId: sessionCategoryIdRef.current,
        categoryName: currentCategory.name,
        correctAnswers: sessionCorrectAnswers,
        totalQuestions: finalTotalQuestions,
        pointsEarned: sessionPoints,
      });
      await refreshProfile();
      await loadLeaderboard();
    }

    setCurrentCategory(null);
    setQuestionQueue([]);

    // Show newsletter modal after first quiz completion
    quizCompletionCountRef.current++;
    if (quizCompletionCountRef.current === 1) {
      const alreadyAsked = localStorage.getItem('sf_newsletter_asked');
      if (!alreadyAsked) {
        setTimeout(() => setShowNewsletterModal(true), 1500);
        localStorage.setItem('sf_newsletter_asked', 'true');
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setIsAnswered(false);
    } else {
      handleEndQuiz();
    }
  };

  const handleShowLeaderboard = () => setScreen('leaderboard');
  const handleBackToDashboard = () => setScreen('dashboard');
  const handleBackToCategories = () => setScreen('category_selection');

  const handleNavigateHome = () => {
    if (screen === 'playing') {
      if (window.confirm('Are you sure you want to leave? Your current quiz progress will be lost.')) {
        handleEndQuiz();
        setScreen('home');
      }
    } else if (screen === 'exam_playing') {
      if (window.confirm('Are you sure you want to leave? Your exam progress will be lost.')) {
        setExamState(null);
        setScreen('home');
      }
    } else {
      setScreen('home');
    }
  };

  const handleOpenFeedback = (question: Question) => {
    setFeedbackQuestion(question);
    setFeedbackModalOpen(true);
  };

  const handleCloseFeedback = () => {
    setFeedbackModalOpen(false);
    setFeedbackQuestion(null);
  };

  const handleSubmitFeedback = async (questionText: string, feedbackText: string) => {
    if (user) {
      await saveFeedback(user.id, questionText, feedbackText);
    }
  };

  const handlePlayAgain = () => {
      if (sessionStats?.categoryName) {
         const categoryId = sessionStats.categoryName === 'Einstein Challenge'
          ? 'einstein_challenge'
          : CATEGORIES.find(c => c.name === sessionStats.categoryName)?.id || 'random';
         handleSelectCategory(categoryId);
      } else {
          setScreen('category_selection');
      }
  };

  // =====================
  // PREMIUM TIER HANDLERS
  // =====================

  const handleCertPrep = () => {
    if (profile?.is_premium) {
      setScreen('cert_hub');
    } else {
      setScreen('premium_upgrade');
    }
  };

  const handleStartExam = (questions: PremiumQuestion[], timeLimitSeconds: number) => {
    setExamState({
      questions,
      answers: new Map(),
      flagged: new Set(),
      currentIndex: 0,
      startTime: Date.now(),
      timeLimitSeconds,
    });
    setScreen('exam_playing');
  };

  const handleSubmitExam = useCallback(async () => {
    if (!examState) return;
    const { questions, answers, startTime } = examState;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    // Calculate scores
    let correctTotal = 0;
    const domainMap = new Map<string, { correct: number; total: number }>();

    questions.forEach((q, i) => {
      const isCorrect = answers.get(i) === q.correct;
      if (isCorrect) correctTotal++;

      const existing = domainMap.get(q.domainId) || { correct: 0, total: 0 };
      existing.total++;
      if (isCorrect) existing.correct++;
      domainMap.set(q.domainId, existing);
    });

    const scorePercent = Math.round((correctTotal / questions.length) * 100);
    const domainBreakdown: DomainScore[] = Array.from(domainMap.entries()).map(([domainId, scores]) => ({
      domainId,
      domainName: currentCert.domains.find(d => d.id === domainId)?.name || domainId,
      correct: scores.correct,
      total: scores.total,
      percent: scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0,
    }));

    const result: ExamResult = {
      certId: currentCert.id,
      certName: currentCert.name,
      totalQuestions: questions.length,
      correctAnswers: correctTotal,
      passed: scorePercent >= currentCert.passingScore,
      passingScore: currentCert.passingScore,
      scorePercent,
      domainBreakdown,
      timeTaken,
      completedAt: new Date().toISOString(),
    };

    setExamResult(result);
    setExamState(null);
    setScreen('exam_results');

    // Save to DB
    if (user) {
      await saveExamResult(user.id, result);
    }
  }, [examState, currentCert, user]);

  const loadFlashcardProgress = useCallback(async () => {
    if (user) {
      const progress = await fetchFlashcardProgress(user.id, currentCert.id);
      setFlashcardProgress(progress);
    }
  }, [user, currentCert.id]);

  const handleFlashcardUpdate = async (flashcardId: string, mastery: 'new' | 'learning' | 'mastered') => {
    // Optimistic update
    setFlashcardProgress(prev => {
      const existing = prev.find(p => p.flashcard_id === flashcardId);
      if (existing) {
        return prev.map(p => p.flashcard_id === flashcardId ? { ...p, mastery, last_reviewed: new Date().toISOString(), review_count: p.review_count + 1 } : p);
      }
      return [...prev, { user_id: user?.id || '', flashcard_id: flashcardId, cert_id: currentCert.id, mastery, last_reviewed: new Date().toISOString(), review_count: 1 }];
    });
    if (user) {
      await upsertFlashcardProgress(user.id, flashcardId, currentCert.id, mastery);
    }
  };

  // Load flashcard progress when entering flashcards screen
  useEffect(() => {
    if (screen === 'flashcards') {
      loadFlashcardProgress();
    }
  }, [screen, loadFlashcardProgress]);

  // Handle Stripe checkout return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
      // Refresh profile to pick up is_premium
      refreshProfile();
    } else if (params.get('checkout') === 'cancel') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [refreshProfile]);

  const handleSignOut = async () => {
    await signOut();
    setPlayer(null);
    setScreen('auth');
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="bg-gray-900 text-white min-h-dvh flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <i className="fa-solid fa-cloud text-5xl text-[#0F79AF] mb-4"></i>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return (
          <HomeScreen
            onStartQuiz={() => setScreen('category_selection')}
            onCertPrep={handleCertPrep}
            onSFNews={() => setScreen('sf_news')}
            onBlog={() => setScreen('blog')}
            onHelp={() => setScreen('help')}
            onDashboard={() => setScreen('dashboard')}
            onLeaderboard={handleShowLeaderboard}
            onSFJobs={() => setScreen('sf_jobs')}
            onTestimonials={() => setScreen('testimonials')}
          />
        );
      case 'help':
        return <HelpScreen onBack={() => setScreen('home')} onFeedback={() => setScreen('feedback')} />;
      case 'feedback':
        return <FeedbackScreen onBack={() => setScreen('home')} />;
      case 'dashboard':
        return <DashboardScreen onStartQuiz={() => setScreen('category_selection')} onShowLeaderboard={handleShowLeaderboard} onEditProfile={() => setScreen('profile_edit')} onCertPrep={handleCertPrep} onSFNews={() => setScreen('sf_news')} onBlog={() => setScreen('blog')} />;
      case 'profile_edit':
        return <ProfileEditScreen onBack={handleBackToDashboard} />;
      case 'category_selection':
        return <CategorySelectionScreen player={player} onSelectCategory={handleSelectCategory} onShowLeaderboard={handleShowLeaderboard} />;
      case 'playing':
        if (currentCategory && currentQuestion) {
          return <QuestionScreen
            category={currentCategory}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questionQueue.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onExit={handleEndQuiz}
            onOpenFeedback={handleOpenFeedback}
            />;
        }
        return null;
      case 'leaderboard':
        return <Leaderboard players={leaderboard.slice(0,10)} currentPlayerName={player?.name || null} onBack={() => setScreen('home')} />;
      case 'score':
        if (sessionStats) {
           return <ScoreScreen stats={sessionStats} player={player} onPlayAgain={handlePlayAgain} onNewCategory={handleBackToCategories} onShowLeaderboard={handleShowLeaderboard} />;
        }
        return null;
      case 'premium_upgrade':
        return <PremiumUpgradeScreen onBack={() => setScreen('home')} />;
      case 'cert_hub':
        return (
          <CertHubScreen
            cert={currentCert}
            onStudyMode={() => setScreen('study_mode')}
            onFlashcards={() => setScreen('flashcards')}
            onPracticeExam={() => setScreen('exam_setup')}
            onBack={handleBackToDashboard}
          />
        );
      case 'study_mode':
        return (
          <StudyModeScreen
            cert={currentCert}
            questions={PREMIUM_QUESTIONS.filter(q => q.certId === currentCert.id)}
            onExit={() => setScreen('cert_hub')}
          />
        );
      case 'flashcards':
        return (
          <FlashcardScreen
            cert={currentCert}
            flashcards={FLASHCARDS.filter(f => f.certId === currentCert.id)}
            progress={flashcardProgress}
            onUpdateProgress={handleFlashcardUpdate}
            onExit={() => setScreen('cert_hub')}
          />
        );
      case 'exam_setup':
        return (
          <ExamSetupScreen
            cert={currentCert}
            questions={PREMIUM_QUESTIONS.filter(q => q.certId === currentCert.id && q.examEligible !== false)}
            onStartExam={handleStartExam}
            onBack={() => setScreen('cert_hub')}
          />
        );
      case 'exam_playing':
        if (examState) {
          return (
            <ExamPlayingScreen
              examState={examState}
              onUpdateExamState={(updater) => setExamState(prev => prev ? updater(prev) : prev)}
              onSubmit={handleSubmitExam}
            />
          );
        }
        return null;
      case 'exam_results':
        if (examResult) {
          return (
            <ExamResultsScreen
              result={examResult}
              cert={currentCert}
              onRetake={() => setScreen('exam_setup')}
              onBackToHub={() => setScreen('cert_hub')}
            />
          );
        }
        return null;
      case 'sf_news':
        return <SFNewsScreen onBack={() => setScreen('home')} />;
      case 'sf_jobs':
        return <SFJobsScreen onBack={() => setScreen('home')} />;
      case 'blog':
        return <BlogScreen onBack={() => setScreen('home')} />;
      case 'testimonials':
        return <TestimonialsScreen onBack={() => setScreen('home')} />;
      default:
        return <AuthScreen />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-dvh bg-cover bg-fixed" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')"}}>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fall { animation: fall linear 1 forwards; }

        @keyframes bounce-in {
          0% { transform: scale(0.5) translateX(100%); opacity: 0; }
          60% { transform: scale(1.1) translateX(0); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }

         @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }

        @keyframes pulse-light {
           0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
           50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
        }
        .animate-pulse-light { animation: pulse-light 2.5s infinite ease-in-out; }

        @keyframes float {
          0% { transform: translateY(20px); opacity: 0; }
          50% { opacity: 0.15; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
      `}</style>
      {screen !== 'auth' && (
        <Header player={player} onNavigateHome={handleNavigateHome} onSignOut={handleSignOut} screen={screen} />
      )}
      <main className="container mx-auto flex-grow flex flex-col justify-center px-4">
        {renderScreen()}
        {prizeAlert && (
           <PrizeAlert key={prizeAlert.name} prize={prizeAlert} onClose={() => setPrizeAlert(null)} />
        )}
         <FeedbackModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedback} question={feedbackQuestion} onSubmitFeedback={handleSubmitFeedback} />
         <NewsletterModal isOpen={showNewsletterModal} onClose={() => setShowNewsletterModal(false)} />
      </main>
      {screen !== 'auth' && <Footer />}
    </div>
  );
};

export default App;
