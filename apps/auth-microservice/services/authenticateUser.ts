import bcrypt from "bcrypt";
import { CreateUserDto } from "./createUser";

// Returns the user token if authentication is successful
export default async function authenticateUser({
  email,
  password,
}: CreateUserDto) {
  const existingUser = await app.prisma.userPrivateData.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new Error("Incorrect email or password.");
  }

  const isSamePassword = await bcrypt.compare(
    password,
    existingUser.hashedPassword
  );
  if (!isSamePassword) {
    throw new Error("Incorrect email or password.");
  }

  return existingUser.token;
}
