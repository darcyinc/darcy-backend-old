import { AppInstance } from "#api/main";
import validateToken from "#api/shared/validateToken";
import microserviceRequest from "#utils/microserviceRequest";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.get("/users/:handle", async (req, res) => {
      const isValidToken = await validateToken(req, res);
      if (!isValidToken) return;

      const { handle } = req.params as { handle: string };

      try {
        await microserviceRequest({
          req,
          res,
          path: `/users/${handle}`,
          microservice: "user",
        });
      } catch {
        res.status(500).send({
          error: "Internal server error",
          message: "Internal server error",
          status: 500,
        });
      }
    });
  }
}
