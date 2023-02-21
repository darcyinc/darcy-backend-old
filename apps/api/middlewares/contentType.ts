import { AppInstance } from "../main";

export default class Middleware {
  constructor(private readonly fastify: AppInstance) {
    this.fastify.addHook("preHandler", (req, res, done) => {
      // check if request is not a GET or HEAD request
      if (["GET", "HEAD"].includes(req.method)) {
        done();
        return;
      }

      // check if request has a content-type header
      if (!req.headers["content-type"]) {
        res.status(400).send({
          errors: [{ message: "Bad Request" }],
          message: "Content-Type header is required",
          statusCode: 400,
        });
        return;
      }

      // check if request has a content-type header and it is not application/json
      if (req.headers["content-type"] !== "application/json") {
        res.status(400).send({
          errors: [{ message: "Bad Request" }],
          message: "Content-Type header must be application/json",
          statusCode: 400,
        });
        return;
      }

      done();
    });
  }
}
