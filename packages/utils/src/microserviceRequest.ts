import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { FastifyReply, FastifyRequest } from 'fastify';

const Microservices = {
	auth: `http://localhost:${process.env.AUTH_MICROSERVICE_PORT}`,
	feed: `http://localhost:${process.env.FEED_MICROSERVICE_PORT}`,
	post: `http://localhost:${process.env.POST_MICROSERVICE_PORT}`,
	user: `http://localhost:${process.env.USER_MICROSERVICE_PORT}`,
	social: `http://localhost:${process.env.SOCIAL_MICROSERVICE_PORT}`,
};

export interface Request {
	method?: 'delete' | 'get' | 'post' | 'put';
	microservice: keyof typeof Microservices;
	path: `/${string}`;
	req: FastifyRequest;
	res: FastifyReply;
}

export async function microserviceRequest({ microservice, path, req, res, method }: Request) {
	try {
		const { authorization } = req.headers;

		const axiosReq = await axios(`${Microservices[microservice]}${path}`, {
			method: method ?? req.method,
			data: req.body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: authorization?.replace('Bearer ', '') ?? null,
			},
		});
		void res.status(axiosReq.status).send(axiosReq.data);

		return axiosReq;
	} catch (error: any) {
		const response = error.response as AxiosResponse | undefined;
		if (response) {
			return res.status(response.status).send(response.data);
		}

		throw error;
	}
}
