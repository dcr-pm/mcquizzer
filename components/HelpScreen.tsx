import React, { useState } from 'react';

interface HelpScreenProps {
  onBack: () => void;
}

interface Section {
  title: string;
  icon: string;
  color: string;
  items: { q: string; a: string }[];
}

const SECTIONS: Section[] = [
  {
    title: 'Getting Started',
    icon: 'fa-rocket',
    color: 'text-blue-400',
    items: [
      {
        q: 'What is SF Quizzer?',
        a: 'SF Quizzer is your all-in-one Salesforce learning platform. It combines fun quizzes, certification prep tools, real-time news, and community content to help you grow your Salesforce career.',
      },
      {
        q: 'How do I sign in?',
        a: 'Enter your name and email address on the sign-in screen. We will send you an 8-digit code to your email. Enter that code to sign in. Use a personal email like Gmail, Outlook, or Yahoo for the best experience.',
      },
      {
        q: 'Is SF Quizzer free?',
        a: 'Yes! The quiz feature with points, badges, and leaderboard is completely free. Cert Prep Pro (study mode, flashcards, and practice exams) is a premium feature.',
      },
    ],
  },
  {
    title: 'Free Quiz',
    icon: 'fa-play',
    color: 'text-teal-400',
    items: [
      {
        q: 'How does the quiz work?',
        a: 'Choose a category (or go Random), then answer multiple-choice questions. Each question has a timer. The faster you answer correctly, the more points you earn. You get 10 base points per correct answer plus a time bonus.',
      },
      {
        q: 'What are badges?',
        a: 'Badges are rewards you unlock as you accumulate points. Keep playing quizzes to earn more points and unlock all the badges.',
      },
      {
        q: 'How does the leaderboard work?',
        a: 'The leaderboard ranks all players by total points. Play more quizzes and answer correctly to climb the ranks. Your points are saved to your account so they carry over between sessions.',
      },
      {
        q: 'What is the Einstein Challenge?',
        a: 'The Einstein Challenge is a harder quiz mode with more questions and a 1.5x points multiplier. It is for experienced players who want a bigger challenge and bigger rewards.',
      },
    ],
  },
  {
    title: 'Cert Prep Pro',
    icon: 'fa-certificate',
    color: 'text-cyan-400',
    items: [
      {
        q: 'What is Cert Prep Pro?',
        a: 'Cert Prep Pro is our premium certification preparation suite. It includes Study Mode (untimed practice with explanations), Flashcards (with mastery tracking), and Practice Exams (timed, graded, with domain breakdowns).',
      },
      {
        q: 'How do I unlock Cert Prep Pro?',
        a: 'You can purchase it through our secure Stripe checkout, or if you have a ProPass code, enter it on the upgrade screen to get instant access without payment.',
      },
      {
        q: 'How does Study Mode work?',
        a: 'Study Mode gives you untimed questions with the option to filter by domain. After answering, you see an immediate explanation of the correct answer. No points are awarded, so you can focus purely on learning.',
      },
      {
        q: 'How do Flashcards work?',
        a: 'Tap a flashcard to reveal the answer. Then mark it as "Got It" or "Still Learning". Cards progress through three stages: New, Learning, and Mastered. Your progress is saved so you can pick up where you left off.',
      },
      {
        q: 'How do Practice Exams work?',
        a: 'Practice exams simulate the real certification experience. Choose Full Exam or Quick Practice mode. You get a countdown timer, can navigate between questions, and flag questions for review. No feedback is given until you submit. Results show your overall score and a breakdown by domain.',
      },
      {
        q: 'What score do I need to pass?',
        a: 'The passing score matches the real Salesforce certification exam. For the Marketing Cloud Email Specialist, you need 65% to pass.',
      },
    ],
  },
  {
    title: 'Account & Settings',
    icon: 'fa-gear',
    color: 'text-gray-400',
    items: [
      {
        q: 'How do I change my display name?',
        a: 'Go to your Dashboard and click the edit (pencil) icon on your profile card. You can update your display name there.',
      },
      {
        q: 'How do I sign out?',
        a: 'Click your avatar in the top right corner and select "Sign Out" from the dropdown menu.',
      },
      {
        q: 'I have feedback or found a bug. How do I report it?',
        a: 'During a quiz, you can click the feedback button on any question to report issues. You can also reach out to the founder on LinkedIn at linkedin.com/in/darrenross-pm.',
      },
    ],
  },
];

const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<number>(0);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-circle-question text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">How to Use SF Quizzer</h1>
        <p className="text-gray-400 text-sm">Everything you need to know to get the most out of SF Quizzer</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map((section, i) => (
          <button
            key={i}
            onClick={() => setOpenSection(i)}
            className={`text-xs sm:text-sm px-3 py-1.5 rounded-full transition-colors ${openSection === i ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
          >
            <i className={`fa-solid ${section.icon} mr-1`}></i>{section.title}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        {SECTIONS[openSection].items.map((item, j) => {
          const key = `${openSection}-${j}`;
          const isOpen = openItem === key;
          return (
            <div key={key} className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => toggleItem(key)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-white text-sm font-semibold pr-4">{item.q}</span>
                <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 animate-fade-in-up">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HelpScreen;
