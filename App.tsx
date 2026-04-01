import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, Category, Question, GameScreen, Prize, SessionStats } from './types.ts';
import { CATEGORIES, PRIZES, QUESTIONS_PER_ROUND, EINSTEIN_CHALLENGE_QUESTIONS } from './constants.ts';
import { ALL_QUESTIONS } from './questions.ts';
import { useAuth } from './lib/AuthContext.tsx';
import { saveQuizResult, fetchLeaderboard, saveFeedback } from './lib/database.ts';
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

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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

  const currentQuestion = questionQueue[currentQuestionIndex];

  // Sync player state from auth profile
  useEffect(() => {
    if (profile) {
      setPlayer({ id: profile.id, name: profile.display_name, points: profile.points, level: profile.level });
      const existingPrizes = PRIZES.filter(prize => profile.points >= prize.points);
      setUnlockedPrizes(existingPrizes);
      if (screen === 'auth') setScreen('dashboard');
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
        setScreen('dashboard');
      }
    } else {
      setScreen('dashboard');
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
      case 'dashboard':
        return <DashboardScreen onStartQuiz={() => setScreen('category_selection')} onShowLeaderboard={handleShowLeaderboard} onEditProfile={() => setScreen('profile_edit')} />;
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
        return <Leaderboard players={leaderboard.slice(0,10)} currentPlayerName={player?.name || null} onBack={handleBackToDashboard} />;
      case 'score':
        if (sessionStats) {
           return <ScoreScreen stats={sessionStats} player={player} onPlayAgain={handlePlayAgain} onNewCategory={handleBackToCategories} onShowLeaderboard={handleShowLeaderboard} />;
        }
        return null;
      default:
        return <AuthScreen />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-dvh bg-cover bg-fixed" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}>
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
      </main>
      {screen !== 'auth' && <Footer />}
    </div>
  );
};

export default App;
