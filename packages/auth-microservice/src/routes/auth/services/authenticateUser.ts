import { PrismaClient } from "@darcy/database";
import bcrypt from "bcrypt";
import { CreateUserDto } from "./createUser";

export default async function authenticateUser(
  prisma: PrismaClient,
  { email, password }: CreateUserDto
) {
  const existingUser = await prisma.userPrivateData.findUnique({
    where: {
      email,
    },
  });

  const isSamePassword = existingUser
    ? await bcrypt.compare(password, existingUser.hashedPassword)
    : false;
  if (!existingUser || isSamePassword) {
    throw new Error("Incorrect email or password.");
  }

  return existingUser.token;
}
