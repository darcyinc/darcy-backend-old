import { AppInstance } from "../main";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.post("/", async (_, res) => {
      return res.send({ message: "Hello world!" });
    });
  }
}
