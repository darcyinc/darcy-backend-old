import { PrismaClient } from "@darcy/database";
import { promisify } from "util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomBetween from "../../../utils/randomBetween";

export interface CreateUserDto {
  email: string;
  password: string;
}

const jwtSign = promisify(jwt.sign);

export default async function createUser(
  prisma: PrismaClient,
  { email, password }: CreateUserDto
) {
  const existingUser = await prisma.userPrivateData.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const baseUserhandle = email.split("@")[0].slice(0, 9);

  const randomNum = randomBetween(900, 999999);
  const handle = `${baseUserhandle}${randomNum}`;

  const randomSaltNum = randomBetween(1, 10);
  const hashedPassword = await bcrypt.hash(password, randomSaltNum);

  const token = (await jwtSign(
    hashedPassword,
    process.env.JWT_SECRET!
  )) as string;

  await prisma.user.create({
    data: {
      name: handle,
      handle,
      privateData: {
        create: {
          email,
          hashedPassword,
          token,
        },
      },
    },
  });

  return token;
}
