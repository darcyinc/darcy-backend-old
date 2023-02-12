import { PrismaClient } from "@darcy/database";
import getUserFromToken from "./getUserFromToken";

export interface GetUserDto {
  token: string;
  handle: string | '@me';
}

export default async function getUser(prisma: PrismaClient, {handle, token}: GetUserDto) {
  const privateData = await getUserFromToken(prisma, token);

  if (handle === '@me') {
    return privateData.user;
  }

  const user = await prisma.user.findUnique({
    where: {
      handle,
    },
  });

  return user;
}
