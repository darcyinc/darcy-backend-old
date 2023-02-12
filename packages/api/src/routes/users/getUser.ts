import type { RouteOptions } from "..";

export default function authenticateUserRoute({ app }: RouteOptions) {
  app.route({
    method: "GET",
    url: "/users/:handle",

    handler: async (req, res) => {
      const { handle } = req.params as { handle: string };

      try {
        const data = await fetch(
          `http://localhost:${process.env.SOCIAL_MICROSERVICE_PORT}/users/${handle}`,
          {
            method: "GET",
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
