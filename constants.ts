
import { Category, Player, Prize } from './types.ts';

export const CATEGORIES: Omit<Category, 'questions'>[] = [
  {
    id: 'email_studio',
    name: 'Email Studio',
    description: 'Master the art of creating and sending personalized emails.',
    icon: 'fa-envelope',
    color: '#00a1e0',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 'automation_studio',
    name: 'Automation Studio',
    description: 'Automate your marketing tasks and data management processes.',
    icon: 'fa-gears',
    color: '#7B2CBF',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    id: 'journey_builder',
    name: 'Journey Builder',
    description: 'Design and automate 1-to-1 customer journeys across channels.',
    icon: 'fa-route',
    color: '#E02A9A',
    gradient: 'from-pink-400 to-pink-600',
  },
    {
    id: 'data_management',
    name: 'Data Management',
    description: 'Understand how data is stored and managed within SFMC.',
    icon: 'fa-database',
    color: '#2AC9E0',
    gradient: 'from-cyan-400 to-cyan-600',
  },
   {
    id: 'analytics',
    name: 'Analytics',
    description: 'Track, measure, and analyze your marketing performance.',
    icon: 'fa-chart-simple',
    color: '#4CAF50',
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: 'mobile_studio',
    name: 'Mobile Studio',
    description: 'Engage customers with SMS and push notifications.',
    icon: 'fa-mobile-screen-button',
    color: '#FFC107',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 'einstein',
    name: 'Einstein',
    description: 'Leverage AI to enhance your marketing intelligence.',
    icon: 'fa-brain',
    color: '#FF9E1B',
    gradient: 'from-orange-400 to-orange-600',
  },
];

export const INITIAL_LEADERBOARD: Player[] = [
  { rank: 1, name: 'Alex Johnson', points: 2450, level: 25 },
  { rank: 2, name: 'Sam Wilson', points: 1980, level: 20 },
  { rank: 3, name: 'Taylor Reed', points: 1750, level: 18 },
  { rank: 4, name: 'Jordan Lee', points: 1620, level: 17 },
  { rank: 5, name: 'Casey Smith', points: 1480, level: 15 },
];

export const PRIZES: Prize[] = [
  { points: 100, name: 'SFMC Novice Badge', icon: 'fa-medal' },
  { points: 300, name: 'Email Expert Badge', icon: 'fa-envelope-open-text' },
  { points: 500, name: 'Automation Master Badge', icon: 'fa-robot' },
  { points: 750, name: 'Journey Builder Pro Badge', icon: 'fa-route' },
  { points: 1000, name: 'Data Wizard Badge', icon: 'fa-hat-wizard' },
  { points: 1500, name: 'SFMC Guru Badge', icon: 'fa-trophy' },
  { points: 2000, name: 'Einstein AI Expert Badge', icon: 'fa-brain', color: '#FF9E1B' },
];

export const TIMER_DURATION = 30;
export const QUESTIONS_PER_ROUND = 10;
export const EINSTEIN_CHALLENGE_QUESTIONS = 15;