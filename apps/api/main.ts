import { FastifyManager } from "#utils/FastifyManager";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import fastify from "fastify";
import cors from "@fastify/cors";

config({ path: __dirname + "/../../.env" });

export type AppInstance = typeof app;

declare global {
  // eslint-disable-next-line no-var
  var app: AppInstance;
}

const app = fastify({
  // 50 mb
  bodyLimit: 52428800,
});
app.prisma = new PrismaClient();

global.app = app;

async function bootstrap() {
  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  });

  // Add listener to add routes
  app.addHook("onRoute", (routeOptions) => {
    console.log(
      `[REST] Route added: [${routeOptions.method}] ${routeOptions.url}`
    );
  });

  app.setErrorHandler((_err, _req, reply) => {
    reply.status(500).send({
      errors: [{ message: "Internal server error" }],
      message: "Internal server error",
      statusCode: 500,
    });
  });

  const manager = new FastifyManager(app);
  await manager.loadConsumers(__dirname + "/middlewares");
  await manager.loadConsumers(__dirname + "/routes");

  await app.listen({
    host: "0.0.0.0",
    port: 4000,
  });

  console.log("[REST] Server started on port 4000");
}

bootstrap();
