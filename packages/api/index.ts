import fastify from "fastify";
import cors from "@fastify/cors";
import { loadRoutes } from "./src/routes/index";

const server = fastify();

async function main() {
  await loadRoutes(server);

  await server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  await server.listen({ host: "0.0.0.0", port: 4000 });

  console.log("Server listening on port 4000");
}

main();
