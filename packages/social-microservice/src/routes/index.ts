import prisma, { PrismaClient } from "@darcy/database";
import { FastifyInstance } from "fastify";
import { readdir } from "fs/promises";

export interface RouteOptions {
  app: FastifyInstance;
  prisma: PrismaClient;
}

export async function loadRoutes(app: FastifyInstance) {
  const files = await readdir("./src/routes");

  for (const routes of files) {
    if (routes.endsWith(".js") || routes.endsWith(".ts")) continue;

    const routePaths = await readdir(`./src/routes/${routes}`);
    for (const file of routePaths) {
      // we can have folders inside routes
      if (!file.endsWith(".js") && !file.endsWith(".ts")) continue;

      const { default: route } = (await import(`./${routes}/${file}`)) as {
        default: (options: RouteOptions) => void;
      };

      route({ app, prisma });
    }
  }
}
