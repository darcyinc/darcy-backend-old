import { AppInstance } from "../main";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.post("/", async (_, res) => {
      const d = await this.fastify.prisma.user.findFirst({
        where: {
          handle: "davipatri15722",
        },
      });

      return res.send(d);
    });
  }
}
