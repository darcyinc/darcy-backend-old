import type { RouteOptions } from "..";
import parseUserCredentials from "../../utils/parseUserCredentials.js";
import UserAuthValidator from "../../validators/UserAuthValidator.js";

const validator = UserAuthValidator();

export default function authenticateUserRoute({ app }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users/login",

    preHandler: (req, res, done) => {
      parseUserCredentials(req, res, done);
    },

    handler: async (req, res) => {
      const { email, password } = req.body as Record<string, string>;
      const result = await validator.safeParseAsync({ email, password });

      if (!result.success) {
        res.status(400);
        return res.send({
          errors: result.error.issues,
        });
      }

      res.status(200);
      res.send({
        message: "success",
      });
    },
  });
}
