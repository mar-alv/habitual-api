import { prisma } from "@/infra/db/prisma";
import { IHabitsRepository } from "./habits.repository";

export class PrismaHabitsRepository implements IHabitsRepository {
  async create(data: any) {
    return prisma.habit.create({ data });
  }

  async findAll() {
    return prisma.habit.findMany();
  }

  async findById(id: string) {
    return prisma.habit.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    try {
      return await prisma.habit.update({
        where: { id },
        data,
      });
    } catch {
      return null;
    }
  }

  async delete(id: string) {
    try {
      await prisma.habit.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async createLog(habitId: string, data: any) {
    try {
      return await prisma.habitLog.create({
        data: {
          habitId,
          ...data,
        },
      });
    } catch (err: any) {
      // 👇 handle duplicate (same day)
      if (err.code === "P2002") {
        // update instead
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
  }

  async getLogsByHabit(habitId: string) {
    return prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { date: "asc" },
    });
  }
}
