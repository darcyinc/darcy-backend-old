import { RouteOptions } from "..";

import verifyRequestData from "../../utils/verifyRequestData";
import services from "./services";
import HttpStatus from "http-status-codes";

export default function createUserRoute({ app, prisma }: RouteOptions) {
  app.route({
    method: "GET",
    url: "/users/:handle",

    preHandler: (req, res, done) => {
      verifyRequestData(req, res, done);
    },

    handler: async (req, res) => {
      const { handle } = req.params as { handle: string };

      const user = await services.getUser(prisma, {
        token: req.headers.authorization!,
        handle,
      });

      if (!user)
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ errors: [{ message: "User not found" }] });

      return res.send(user);
    },
  });
}
