import { prisma } from "@/plugins/prisma";
import {
  CreateHabitBody,
  CreateHabitLogBody,
  UpdateHabitBody,
} from "@/schemas";

export const habitsRepository = {
  async create(data: CreateHabitBody) {
    return prisma.habit.create({ data });
  },

  async findAll() {
    return prisma.habit.findMany();
  },

  async findById(id: string) {
    return prisma.habit.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateHabitBody) {
    try {
      return await prisma.habit.update({
        where: { id },
        data,
      });
    } catch {
      return null;
    }
  },

  async delete(id: string) {
    try {
      await prisma.habit.delete({
        where: { id },
      });

      return true;
    } catch {
      return false;
    }
  },

  async createLog(habitId: string, data: CreateHabitLogBody) {
    try {
      return await prisma.habitLog.create({
        data: {
          habitId,
          ...data,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        return prisma.habitLog.update({
          where: {
            habitId_date: {
              habitId,
              date: data.date,
            },
          },
          data: {
            completed: data.completed,
            value: data.value,
          },
        });
      }

      throw err;
    }
  },

  async getLogsByHabit(habitId: string) {
    return prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { date: "asc" },
    });
  },
};
