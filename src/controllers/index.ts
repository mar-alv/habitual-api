import { FastifyReply, FastifyRequest } from "fastify";
import { habitsService } from "@/services";
import {
  CreateHabitBody,
  UpdateHabitBody,
  CreateHabitLogBody,
  HabitParams,
  ToggleHabitBody,
} from "@/schemas";

export const habitsController = {
  async create(
    req: FastifyRequest<{ Body: CreateHabitBody }>,
    reply: FastifyReply,
  ) {
    const habit = await habitsService.createHabit(req.body);

    return reply.send(habit);
  },

  async list(_: FastifyRequest, reply: FastifyReply) {
    return reply.send(await habitsService.listHabits());
  },

  async update(
    req: FastifyRequest<{
      Params: HabitParams;
      Body: UpdateHabitBody;
    }>,
    reply: FastifyReply,
  ) {
    const habit = await habitsService.updateHabit(req.params.id, req.body);

    return reply.send(habit);
  },

  async delete(
    req: FastifyRequest<{ Params: HabitParams }>,
    reply: FastifyReply,
  ) {
    const success = await habitsService.deleteHabit(req.params.id);

    return reply.send({ success });
  },

  async log(
    req: FastifyRequest<{
      Params: HabitParams;
      Body: CreateHabitLogBody;
    }>,
    reply: FastifyReply,
  ) {
    const log = await habitsService.logHabit(req.params.id, req.body);

    return reply.send(log);
  },

  async check(
    req: FastifyRequest<{
      Params: HabitParams;
      Body: ToggleHabitBody;
    }>,
    reply: FastifyReply,
  ) {
    const result = await habitsService.checkHabit(
      req.params.id,
      req.body.completed,
    );

    return reply.send(result);
  },

  async metrics(
    req: FastifyRequest<{ Params: HabitParams }>,
    reply: FastifyReply,
  ) {
    const metrics = await habitsService.getMetrics(req.params.id);

    return reply.send(metrics);
  },
};
