import { z } from "zod";

export const createHabitSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "custom"]),
  targetPerPeriod: z.number().optional(),
});

export const updateHabitSchema = createHabitSchema.partial();

export const createHabitLogSchema = z.object({
  date: z.string(),
  completed: z.boolean(),
  value: z.number().optional(),
});

export type CreateHabitBody = z.infer<typeof createHabitSchema>;
export type UpdateHabitBody = z.infer<typeof updateHabitSchema>;
export type CreateHabitLogBody = z.infer<typeof createHabitLogSchema>;

export type HabitParams = {
  id: string;
};
