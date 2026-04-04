import cors from "@fastify/cors";
import { habitsRoutes } from "@/modules/habits/habits.routes";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export function buildApp() {
  const app = Fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  });

  app.register(habitsRoutes);

  return app;
}
