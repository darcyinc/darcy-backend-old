import type { RouteOptions } from "..";
import parseUserCredentials from "../../utils/parseUserCredentials";
import UserAuthValidator from "../../validators/UserAuthValidator";

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
        return res.status(400).send({
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
