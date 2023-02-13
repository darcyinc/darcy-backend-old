import { FastifyReply, FastifyRequest } from "fastify";

export default function verifyRequestData(
  req: FastifyRequest,
  res: FastifyReply,
  done: () => void
) {
  if (!req.body) {
    res.code(400);
    res.send({
      errors: [{ message: "No body provided" }],
    });
    return;
  }

  if (
    !(req.headers["content-type"]?.toLowerCase() ?? "").startsWith(
      "application/json"
    )
  ) {
    res.code(400);
    res.send({
      errors: [{ message: "Invalid content type" }],
    });
    return;
  }

  done();
}
