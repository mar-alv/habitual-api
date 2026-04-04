import { FastifyReply, FastifyRequest } from "fastify";
import { HabitsService } from "./habits.service";
import {
  CreateHabitBody,
  UpdateHabitBody,
  CreateHabitLogBody,
  HabitParams,
} from "./habits.schemas";

export class HabitsController {
  constructor(private service: HabitsService) {}

  create = async (
    req: FastifyRequest<{ Body: CreateHabitBody }>,
    reply: FastifyReply,
  ) => {
    const habit = await this.service.createHabit(req.body);

    return reply.send(habit);
  };

  list = async (_: FastifyRequest, reply: FastifyReply) => {
    return reply.send(await this.service.listHabits());
  };

  update = async (
    req: FastifyRequest<{
      Params: HabitParams;
      Body: UpdateHabitBody;
    }>,
    reply: FastifyReply,
  ) => {
    const habit = await this.service.updateHabit(req.params.id, req.body);

    return reply.send(habit);
  };

  delete = async (
    req: FastifyRequest<{ Params: HabitParams }>,
    reply: FastifyReply,
  ) => {
    const success = await this.service.deleteHabit(req.params.id);

    return reply.send({ success });
  };

  log = async (
    req: FastifyRequest<{
      Params: HabitParams;
      Body: CreateHabitLogBody;
    }>,
    reply: FastifyReply,
  ) => {
    const log = await this.service.logHabit(req.params.id, req.body);

    return reply.send(log);
  };
}
