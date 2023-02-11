import fastify from "fastify";
import { loadRoutes } from "./src/routes/index.js";

const server = fastify();

async function main() {
  await loadRoutes(server);
  await server.listen({ port: 4000 });

  console.log("Server listening on port 4000");
}

main();
