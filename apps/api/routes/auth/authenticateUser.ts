import { AppInstance } from "#api/main";
import microserviceRequest from "#utils/microserviceRequest";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.post("/auth/users/login", async (req, res) => {
      try {
        await microserviceRequest({
          req,
          res,
          path: "/auth/users/login",
          microservice: "auth",
        });
      } catch {
        res.status(500).send({
          errors: [{ message: "Internal server error" }],
          message: "Internal server error",
          status: 500,
        });
      }
    });
  }
}
