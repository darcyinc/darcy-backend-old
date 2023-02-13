import { RouteOptions } from "..";
import { CreateUserDto } from "./services/createUser";

import HttpStatus from "http-status-codes";
import UserAuthValidator from "../../validators/UserAuthValidator";
import services from "./services";

const validator = UserAuthValidator();

export default function createUserRoute({ app, prisma }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users",

    handler: async (req, res) => {
      const { email, password } = (req.body ?? {}) as CreateUserDto;
      const result = await validator.safeParseAsync({ email, password });

      if (!result.success) {
        return res.status(400).send({
          errors: result.error.issues,
        });
      }

      return services
        .createUser(prisma, result.data)
        .then((token) => {
          return res.status(HttpStatus.OK).send({
            token,
          });
        })
        .catch((err) => {
          if (err.message === "User already exists")
            return res.status(HttpStatus.CONFLICT).send({
              errors: [{ message: err.message }],
            });

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: err.message }],
          });
        });
    },
  });
}
