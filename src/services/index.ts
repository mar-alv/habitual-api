import { habitsRepository } from "@/repositories";
import {
  CreateHabitBody,
  CreateHabitLogBody,
  UpdateHabitBody,
} from "@/schemas";

export const habitsService = {
  async createHabit(data: CreateHabitBody) {
    return habitsRepository.create(data);
  },

  async listHabits() {
    return habitsRepository.findAll();
  },

  async updateHabit(id: string, data: UpdateHabitBody) {
    return habitsRepository.update(id, data);
  },

  async deleteHabit(id: string) {
    return habitsRepository.delete(id);
  },

  async logHabit(habitId: string, data: CreateHabitLogBody) {
    return habitsRepository.createLog(habitId, data);
  },

  async getMetrics(habitId: string) {
    const logs = await habitsRepository.getLogsByHabit(habitId);

    const total = logs.length;
    const completed = logs.filter((l) => l.completed).length;

    return {
      totalDays: total,
      completedDays: completed,
      completionRate: total ? completed / total : 0,
      logs,
    };
  },
};
