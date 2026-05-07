import "dotenv/config";
import cors from "@fastify/cors";
import { habitsRoutes } from "@/routes";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = Fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.register(habitsRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 Server running on http://localhost:3333");
});
