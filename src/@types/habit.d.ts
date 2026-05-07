export {};

declare global {
  type HabitFrequency = "daily" | "weekly" | "custom";

  interface Habit {
    id: string;
    name: string;
    description: string | null;
    targetPerPeriod: number | null;
    frequency: HabitFrequency;
    createdAt: Date;
    updatedAt: Date;
  }

  interface HabitLog {
    id: string;
    habitId: string;
    date: string;
    completed: boolean;
    value: number | null;
    createdAt: Date;
  }
}
