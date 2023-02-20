import createUser, { CreateUserDto } from "#auth/services/createUser";
import credentials from "#auth/validators/credentials";
import HttpStatusCode from "http-status-codes";
import { AppInstance } from "../main";

export default class Route {
  constructor(private readonly fastify: AppInstance) {
    this.addRoutes();
  }

  private addRoutes() {
    this.fastify.post("/auth/users", async (req, res) => {
      const { email, password } = (req.body ?? {}) as CreateUserDto;
      const result = await credentials.safeParseAsync({ email, password });

      if (!result.success) {
        return res.status(400).send({
          errors: result.error.issues,
        });
      }

      try {
        const token = await createUser({ email, password });
        res.send({ token });
      } catch (err) {
        if (err.message === "A user with that email already exists.")
          return res.status(HttpStatusCode.CONFLICT).send({
            errors: [{ message: err.message }],
          });

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          errors: [{ message: err.message }],
        });
      }
    });
  }
}
