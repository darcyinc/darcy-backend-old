import { PrismaClient } from "@darcy/database";

export default async function getUserFromToken(prisma: PrismaClient, token: string) {
  const existingUser = await prisma.userPrivateData.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!existingUser) {
    throw new Error("Invalid token.");
  }

  return existingUser;
}