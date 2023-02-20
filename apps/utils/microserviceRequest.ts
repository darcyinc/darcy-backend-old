import axios, { AxiosResponse } from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

const Microservices = {
  auth: `http://localhost:${process.env.AUTH_MICROSERVICE_PORT}`,
  feed: `http://localhost:${process.env.FEED_MICROSERVICE_PORT}`,
  post: `http://localhost:${process.env.POST_MICROSERVICE_PORT}`,
  social: `http://localhost:${process.env.SOCIAL_MICROSERVICE_PORT}`,
};

export interface Request {
  microservice: keyof typeof Microservices;
  path: `/${string}`;
  req: FastifyRequest;
  res: FastifyReply;
  method?: "get" | "post" | "put" | "delete";
}

export default async function microserviceRequest({
  microservice,
  path,
  req,
  res,
  method,
}: Request) {
  try {
    const axiosReq = await axios(`${Microservices[microservice]}${path}`, {
      method: method ?? req.method,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization!,
      },
    });
    res.status(axiosReq.status).send(axiosReq.data);

    return axiosReq;
  } catch (e) {
    const response = e.response as AxiosResponse | undefined;
    if (response) {
      return res.status(response.status).send(response.data);
    }

    throw e;
  }
}
