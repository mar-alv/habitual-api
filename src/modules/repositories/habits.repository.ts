import { Habit, HabitLog } from "../habits/habits.types";

export interface IHabitsRepository {
  create(data: Omit<Habit, "id" | "createdAt" | "updatedAt">): Promise<Habit>;
  findAll(): Promise<Habit[]>;
  findById(id: string): Promise<Habit | null>;
  update(id: string, data: Partial<Habit>): Promise<Habit | null>;
  delete(id: string): Promise<boolean>;
  createLog(
    habitId: string,
    data: {
      date: string;
      completed: boolean;
      value?: number;
    },
  ): Promise<HabitLog>;
  getLogsByHabit(habitId: string): Promise<HabitLog[]>;
}
