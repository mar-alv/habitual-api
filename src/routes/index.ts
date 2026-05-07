import { habitsController } from "@/controllers";
import {
  createHabitSchema,
  updateHabitSchema,
  createHabitLogSchema,
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
