import { IHabitsRepository } from "./habits.repository";
import { InMemoryHabitsRepository } from "./habits.in-memory.repository";
import { PrismaHabitsRepository } from "./habits.prisma.repository";

export function makeHabitsRepository(): IHabitsRepository {
  const db = process.env.DB ?? "memory";

  if (db === "memory") {
    console.log("🧠 Using In-Memory DB");
    return new InMemoryHabitsRepository();
  }

  if (db === "prisma") {
    console.log("🗄️ Using Prisma DB");
    return new PrismaHabitsRepository();
  }

  throw new Error(`Unknown DB provider: ${db}`);
}
