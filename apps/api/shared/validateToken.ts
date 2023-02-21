import token from "#api/validators/token";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function isValidToken(
  req: FastifyRequest,
  res: FastifyReply
) {
  const isValid = await token.safeParseAsync(req.headers.authorization);
  if (!req.headers.authorization || !isValid.success) {
    res.status(401).send({
      errors: [{ message: "Unauthorized" }],
      message: "Invalid token",
      statusCode: 401,
    });
    return false;
  }

  const data = await app.prisma.userPrivateData.findFirst({
    where: {
      token: req.headers.authorization.replace("Bearer ", ""),
    },
  });

  if (!data) {
    res.status(401).send({
      errors: [{ message: "Unauthorized" }],
      message: "Invalid token",
      statusCode: 401,
    });
    return false;
  }

  return true;
}
