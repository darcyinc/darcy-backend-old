import { AppInstance } from "../main";

export default class Middleware {
  constructor(private readonly fastify: AppInstance) {
    this.fastify.addHook("preHandler", (req, res, done) => {
      if (req.headers.authorization) {
        app.prisma.userPrivateData
          .findFirst({
            where: {
              token: req.headers.authorization.replace("Bearer ", ""),
            },
          })
          .then((data) => {
            if (data) done();
            else {
              res.status(401).send({
                error: "Unauthorized",
                message: "Invalid token",
                statusCode: 401,
              });
              return;
            }
          });
      } else {
        done();
      }
    });
  }
}
