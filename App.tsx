
import React, { useState, useEffect, useCallback } from 'react';
import { Player, Category, Question, GameScreen, Prize, SessionStats } from './types.ts';
import { CATEGORIES, INITIAL_LEADERBOARD, PRIZES, QUESTIONS_PER_ROUND, EINSTEIN_CHALLENGE_QUESTIONS } from './constants.ts';
import { ALL_QUESTIONS } from './questions.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import PlayerNameModal from './components/PlayerNameModal.tsx';
import CategorySelectionScreen from './components/CategorySelectionScreen.tsx';
import QuestionScreen from './components/QuestionScreen.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import PrizeAlert from './components/PrizeAlert.tsx';
import FeedbackModal from './components/FeedbackModal.tsx';
import ScoreScreen from './components/ScoreScreen.tsx';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [player, setPlayer] = useState<Player | null>(null);
  
  const [leaderboard, setLeaderboard] = useState<Player[]>(() => {
    try {
      const savedLeaderboard = localStorage.getItem('marketingCloudQuizzerLeaderboard');
      return savedLeaderboard ? JSON.parse(savedLeaderboard) : INITIAL_LEADERBOARD;
    } catch (error) {
      console.error("Could not load leaderboard from localStorage", error);
      return INITIAL_LEADERBOARD;
    }
  });

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

  const currentQuestion = questionQueue[currentQuestionIndex];

  useEffect(() => {
    try {
      localStorage.setItem('marketingCloudQuizzerLeaderboard', JSON.stringify(leaderboard));
    } catch (error) {
      console.error("Could not save leaderboard to localStorage", error);
    }
  }, [leaderboard]);
  
  const updateLeaderboard = useCallback((currentPlayer: Player) => {
    setLeaderboard(currentLeaderboard => {
        const otherPlayers = currentLeaderboard.filter(p => p.name !== currentPlayer.name);
        const newLeaderboard = [...otherPlayers, currentPlayer];
        newLeaderboard.sort((a, b) => b.points - a.points);
        return newLeaderboard.slice(0, 50); // Keep leaderboard to a reasonable size
    });
  }, []);

  // Effect for updating player level and leaderboard
  useEffect(() => {
    if (!player) return;
    const newLevel = Math.floor(player.points / 100) + 1;
    if (newLevel !== player.level) {
      setPlayer(p => p ? { ...p, level: newLevel } : null);
    }
    updateLeaderboard(player);
  }, [player, updateLeaderboard]);

  // Definitive effect for handling prize unlocks.
  useEffect(() => {
    if (!player) return;

    const unlockedNames = new Set(unlockedPrizes.map(p => p.name));
    const newPrizes = PRIZES.filter(prize => 
      player.points >= prize.points && !unlockedNames.has(prize.name)
    );

    if (newPrizes.length > 0) {
      // Add all newly unlocked prizes to the state
      setUnlockedPrizes(current => [...current, ...newPrizes]);
      // But only show an alert for the first new one in this batch
      if (!prizeAlert) {
         setPrizeAlert(newPrizes[0]);
      }
    }
  }, [player?.points, unlockedPrizes, prizeAlert]);


  const handleStartGame = () => setScreen('name_entry');

  const handleNameSubmit = (name: string) => {
    // Check if player exists in leaderboard to resume, otherwise create new
    const existingPlayer = leaderboard.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingPlayer) {
        setPlayer(existingPlayer);
        // Sync unlocked prizes for existing player
        const existingPrizes = PRIZES.filter(prize => existingPlayer.points >= prize.points);
        setUnlockedPrizes(existingPrizes);
    } else {
        const newPlayer = { name, points: 0, level: 1 };
        setPlayer(newPlayer);
        setUnlockedPrizes([]); // Start with no prizes
    }
    setScreen('category_selection');
  };
  
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
  
  const handleEndQuiz = () => {
    if (!currentCategory) return;
    
    const questionsAttempted = isAnswered ? currentQuestionIndex + 1 : currentQuestionIndex;
    
    setSessionStats({
      categoryName: currentCategory.name,
      pointsEarned: sessionPoints,
      correctAnswers: sessionCorrectAnswers,
      totalQuestions: questionsAttempted > questionQueue.length ? questionQueue.length : questionsAttempted
    });
    
    setScreen('score');
    
    setCurrentCategory(null);
    setQuestionQueue([]);
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setIsAnswered(false);
    } else {
      handleEndQuiz();
    }
  };

  const handleShowLeaderboard = () => setScreen('leaderboard');
  const handleBackToCategories = () => setScreen('category_selection');
  
  const handleNavigateToCategories = () => {
    if (screen === 'playing') {
      if (window.confirm('Are you sure you want to return to the categories page? Your current quiz progress will be lost.')) {
        handleEndQuiz();
        setScreen('category_selection');
      }
    } else {
      setScreen('category_selection');
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

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStartGame} />;
      case 'name_entry':
        return <PlayerNameModal onNameSubmit={handleNameSubmit} />;
      case 'category_selection':
        return <CategorySelectionScreen onSelectCategory={handleSelectCategory} onShowLeaderboard={handleShowLeaderboard} />;
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
        return <Leaderboard players={leaderboard.slice(0,10)} currentPlayerName={player?.name || null} onBack={handleBackToCategories} />;
      case 'score':
        if (sessionStats) {
           return <ScoreScreen stats={sessionStats} player={player} onPlayAgain={handlePlayAgain} onNewCategory={handleBackToCategories} onShowLeaderboard={handleShowLeaderboard} />;
        }
        return null;
      default:
        return <WelcomeScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen bg-cover bg-fixed" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}>
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
      <Header player={player} onNavigateToCategories={handleNavigateToCategories} screen={screen} />
      <main className="container mx-auto flex-grow flex flex-col justify-center">
        {renderScreen()}
        {prizeAlert && (
           <PrizeAlert key={prizeAlert.name} prize={prizeAlert} onClose={() => setPrizeAlert(null)} />
        )}
         <FeedbackModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedback} question={feedbackQuestion} />
      </main>
      <Footer />
    </div>
  );
};

export default App;