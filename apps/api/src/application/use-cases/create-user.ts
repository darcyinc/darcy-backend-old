import { microserviceRequest } from '@darcyinc/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface CreateUserProps {
	microservice: 'auth' | 'feed' | 'post' | 'social' | 'user';
	path: `/${string}`;
	req: FastifyRequest;
	res: FastifyReply;
}

@Injectable()
export class CreateUser {
	public async execute({ req, res, microservice, path }: CreateUserProps) {
		try {
			await microserviceRequest({
				req,
				res,
				path,
				microservice,
				method: 'post',
			});
		} catch {
			throw new HttpException(
				{ errors: [{ message: 'Internal server error' }], message: 'Internal server error', status: 500 },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
