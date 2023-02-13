import HttpStatus from "http-status-codes";
import type { RouteOptions } from "..";
import UserAuthValidator from "../../validators/UserAuthValidator";
import services from "./services";
import { CreateUserDto } from "./services/createUser";

const validator = UserAuthValidator();

export default function authenticateUserRoute({ app, prisma }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users/login",

    handler: async (req, res) => {
      const { email, password } = (req.body ?? {}) as CreateUserDto;
      const result = await validator.safeParseAsync({ email, password });

      if (!result.success) {
        return res.status(400).send({
          errors: result.error.issues,
        });
      }

      return services
        .authenticateUser(prisma, result.data)
        .then((token) => {
          return res.status(HttpStatus.OK).send({
            token,
          });
        })
        .catch((err) => {
          if (err.message === "Incorrect email or password.")
            return res.status(HttpStatus.UNAUTHORIZED).send({
              errors: [{ message: err.message }],
            });

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: err.message }],
          });
        });
    },
  });
}
