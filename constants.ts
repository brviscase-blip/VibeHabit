
import { Habit, HabitCategory } from './types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Workout',
    description: '30 mins cardio',
    category: HabitCategory.FITNESS,
    goal: '30 mins',
    completedDays: [],
    color: 'orange',
    frequency: 'daily',
  },
  {
    id: '2',
    name: 'Read 10 pages',
    description: 'Atomic Habits',
    category: HabitCategory.READING,
    goal: '10 pages',
    completedDays: ['2023-10-05'], // Assuming today is Oct 5
    color: 'blue',
    frequency: 'daily',
  },
  {
    id: '3',
    name: 'Drink Water',
    description: 'Goal: 3000ml',
    category: HabitCategory.WATER,
    goal: '3000ml',
    targetValue: 3000,
    currentValue: 2000,
    completedDays: [],
    color: 'indigo',
    frequency: 'daily',
  },
  {
    id: '4',
    name: 'Meditate',
    description: '15 mins mindfulness',
    category: HabitCategory.MEDITATION,
    goal: '15 mins',
    completedDays: [],
    color: 'purple',
    frequency: 'daily',
  },
  {
    id: '5',
    name: 'Sleep Early',
    description: 'Before 11:00 PM',
    category: HabitCategory.SLEEP,
    goal: '11:00 PM',
    completedDays: [],
    color: 'yellow',
    frequency: 'daily',
  },
];
