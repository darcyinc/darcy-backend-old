import { PrismaClient } from "./node_modules/.prisma/client";
import { config } from "dotenv";

config({
  path: "../../.env",
});

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
}

main();

export default prisma;
export { prisma, PrismaClient };
