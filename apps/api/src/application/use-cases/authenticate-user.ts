import { microserviceRequest } from '@darcyinc/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface AuthenticateProps {
	microservice: 'auth' | 'feed' | 'post' | 'social' | 'user';
	path: `/${string}`;
	req: FastifyRequest;
	res: FastifyReply;
}

@Injectable()
export class AuthenticateUser {
	public async execute({ microservice, path, req, res }: AuthenticateProps) {
		try {
			await microserviceRequest({
				req,
				res,
				path,
				microservice,
			});
		} catch {
			throw new HttpException(
				{ errors: [{ message: 'Internal server error' }], message: 'Internal server error', status: 500 },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
