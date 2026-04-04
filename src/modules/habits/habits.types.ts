import { HabitFrequency } from "@/shared/types";

export interface Habit {
  id: string;
  name: string;
  description: string | null;
  targetPerPeriod: number | null;
  frequency: HabitFrequency;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  value: number | null;
  createdAt: Date;
}
