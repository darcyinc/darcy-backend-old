import { FastifyReply, FastifyRequest } from "fastify";
import HttpCodes from "http-status-codes";
import TokenValidator from "../validators/TokenValidator";

const validate = TokenValidator();

export default async function verifyRequestData(
  req: FastifyRequest,
  res: FastifyReply,
  done: () => void
) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.code(HttpCodes.UNAUTHORIZED);
    res.send({
      errors: ["Missing authorization header"],
    });
    return;
  }

  const result = await validate.safeParseAsync(authorization);
  if (!result.success) {
    res.code(HttpCodes.UNAUTHORIZED);
    res.send({
      errors: ["Invalid token."],
    });
    return;
  }

  req.headers.authorization = authorization.replace("Bearer ", "");

  done();
}
