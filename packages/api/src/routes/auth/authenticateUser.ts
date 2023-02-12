import type { RouteOptions } from "..";
import verifyRequestData from "../../../utils/verifyRequestData";

export default function authenticateUserRoute({ app }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users/login",

    preHandler: (req, res, next) => {
      verifyRequestData(req, res, next);
    },

    handler: async (req, res) => {
      try {
        const data = await fetch(
          `http://localhost:${process.env.AUTH_MICROSERVICE_PORT}/auth/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.authorization!,
            },
            body: JSON.stringify(req.body),
          }
        );
        const json = (await data.json()) as Record<string, unknown>;

        res.send(json);
      } catch (error) {
        res.send(error);
      }
    },
  });
}
