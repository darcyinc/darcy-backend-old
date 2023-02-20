import token from "#api/validators/token";
import { AppInstance } from "../main";

export default class Middleware {
  constructor(private readonly fastify: AppInstance) {
    this.fastify.addHook("preHandler", async (req, res) => {
      const isValid = await token.safeParseAsync(req.headers.authorization);
      if (!req.headers.authorization || !isValid.success) {
        res.status(401).send({
          error: "Unauthorized",
          message: "Invalid token",
          statusCode: 401,
        });
        throw new Error("Invalid token");
      }

      const data = await app.prisma.userPrivateData.findFirst({
        where: {
          token: req.headers.authorization.replace("Bearer ", ""),
        },
      });

      if (!data) {
        res.status(401).send({
          error: "Unauthorized",
          message: "Invalid token",
          statusCode: 401,
        });
        throw new Error("Invalid token");
      }
    });
  }
}
