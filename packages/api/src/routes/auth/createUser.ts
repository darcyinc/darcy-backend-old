import axios from "axios";
import { RouteOptions } from "..";

export default function createUserRoute({ app }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users",

    handler: async (req, res) => {
      axios
        .post(
          `http://localhost:${process.env.AUTH_MICROSERVICE_PORT}/auth/users`,
          req.body,
          {
            headers: req.headers,
          }
        )
        .then((response) => res.send(response.data))
        .catch((error) => res.send(error));
    },
  });
}
