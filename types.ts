
export enum HabitCategory {
  FITNESS = 'fitness_center',
  READING = 'menu_book',
  WATER = 'water_drop',
  MEDITATION = 'self_improvement',
  SLEEP = 'bedtime',
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  goal: string;
  targetValue?: number;
  currentValue?: number;
  completedDays: string[]; // ISO Dates
  color: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime?: string;
}

export interface DailyInsight {
  quote: string;
  advice: string;
}
