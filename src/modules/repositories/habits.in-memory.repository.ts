import { randomUUID } from "crypto";
import { Habit, HabitLog } from "../habits/habits.types";
import { IHabitsRepository } from "./habits.repository";

export class InMemoryHabitsRepository implements IHabitsRepository {
  private habits: Habit[] = [];
  private logs: HabitLog[] = [];

  async create(data: any): Promise<Habit> {
    const habit: Habit = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    this.habits.push(habit);
    return habit;
  }

  async findAll(): Promise<Habit[]> {
    return this.habits;
  }

  async findById(id: string): Promise<Habit | null> {
    return this.habits.find((h) => h.id === id) || null;
  }

  async update(id: string, data: any): Promise<Habit | null> {
    const habit = await this.findById(id);
    if (!habit) return null;

    Object.assign(habit, data, {
      updatedAt: new Date(),
    });

    return habit;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.habits.findIndex((h) => h.id === id);
    if (index === -1) return false;

    this.habits.splice(index, 1);

    this.logs = this.logs.filter((l) => l.habitId !== id);

    return true;
  }

  async createLog(
    habitId: string,
    data: {
      date: string;
      completed: boolean;
      value?: number;
    },
  ): Promise<HabitLog> {
    const existing = this.logs.find(
      (l) => l.habitId === habitId && l.date === data.date,
    );

    if (existing) {
      existing.completed = data.completed;
      existing.value = data.value ?? null;

      return existing;
    }

    const log: HabitLog = {
      id: randomUUID(),
      habitId,
      createdAt: new Date(),
      date: data.date,
      completed: data.completed,
      value: data.value ?? null,
    };

    this.logs.push(log);
    return log;
  }

  async getLogsByHabit(habitId: string): Promise<HabitLog[]> {
    return this.logs
      .filter((l) => l.habitId === habitId)
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
