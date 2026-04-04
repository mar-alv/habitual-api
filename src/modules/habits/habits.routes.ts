import { FastifyInstance } from "fastify";
import { z } from "zod";
import { makeHabitsRepository } from "../repositories/habits.repository-factory";
import { HabitsService } from "./habits.service";
import { HabitsController } from "./habits.controller";
import {
  createHabitSchema,
  updateHabitSchema,
  createHabitLogSchema,
} from "./habits.schemas";

export async function habitsRoutes(app: FastifyInstance) {
  const repo = makeHabitsRepository();
  const service = new HabitsService(repo);
  const controller = new HabitsController(service);

  app.post(
    "/habits",
    {
      schema: {
        body: createHabitSchema,
      },
    },
    controller.create,
  );

  app.get("/habits", controller.list);

  app.patch(
    "/habits/:id",
    {
      schema: {
        body: updateHabitSchema,
        params: z.object({
          id: z.string(),
        }),
      },
    },
    controller.update,
  );

  app.delete(
    "/habits/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    controller.delete,
  );

  app.post(
    "/habits/:id/logs",
    {
      schema: {
        body: createHabitLogSchema,
        params: z.object({
          id: z.string(),
        }),
      },
    },
    controller.log,
  );
}
