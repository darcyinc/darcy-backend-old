import fastify from "fastify";
import { loadRoutes } from "./src/routes/index.js";
import { config } from "dotenv";

config({ path: "../../.env" });

const server = fastify();
const port = Number(process.env.AUTH_MICROSERVICE_PORT!);

async function main() {
  await loadRoutes(server);
  await server.listen({ port });

  console.log(`Auth microservice listening on port ${port}`);
}

main();
