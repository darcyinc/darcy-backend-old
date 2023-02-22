import { getUserByHandle } from "#users-microservice/services/users";
import { User } from "@prisma/client";
import { AppInstance } from "../main";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.get("/users/:handle", async (req, res) => {
      const { handle } = req.params as { handle: string };

      let user: User | null;
      if (handle === "@me") {
        user = await this.fastify.prisma.user.findFirst({
          where: {
            privateData: {
              some: {
                token: req.headers.authorization!,
              },
            },
          },
        });
      } else {
        user = await getUserByHandle(handle);
      }

      if (!user) {
        return res
          .status(404)
          .send({
            message: "User not found",
            errors: [{ message: "User not found" }],
            statusCode: 404,
          });
      }

      return res.send({ user });
    });
  }
}
