import { habitsController } from "@/controllers";
import {
  createHabitSchema,
  updateHabitSchema,
  createHabitLogSchema,
	toggleHabitSchema,
} from "@/schemas";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function habitsRoutes(app: FastifyInstance) {
  app.post(
    "/habits",
    {
      schema: {
        body: createHabitSchema,
      },
    },
    habitsController.create,
  );

  app.get("/habits", habitsController.list);

  app.put(
    "/habits/:id",
    {
      schema: {
        body: updateHabitSchema,
        params: z.object({
          id: z.string(),
        }),
      },
    },
    habitsController.update,
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
    habitsController.delete,
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
    habitsController.log,
  );

  app.patch(
    "/habits/:id/check",
    {
      schema: {
        body: toggleHabitSchema,
        params: z.object({
          id: z.string(),
        }),
      },
    },
    habitsController.check,
  );

  app.get(
    "/habits/:id/metrics",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    habitsController.metrics,
  );
}
