import { getUserByHandle } from "#users-microservice/services/users";
import { AppInstance } from "../main";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.get("/users/:handle", async (req, res) => {
      const { handle } = req.params as { handle: string };

      let user;
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

      return res.send({ user });
    });
  }
}
