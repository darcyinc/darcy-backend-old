import type { UserRepository } from '@application/repositories/user-repository';
import { microserviceRequest } from '@darcyinc/utils';
import token from '@helpers/token';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface GetUserRequest {
	handle: string;
	req: FastifyRequest;
	res: FastifyReply;
}

@Injectable()
export class GetUser {
	public constructor(private readonly userRepository: UserRepository) {}

	public async execute({ handle, req, res }: GetUserRequest) {
		if (handle === '@me') {
			const isValidToken = await token.safeParseAsync(req.headers.authorization);

			if (!isValidToken) return;

			if (!req.headers.authorization || !isValidToken.success) {
				throw new HttpException(
					{
						errors: [{ message: 'Unauthorized' }],
						message: 'Invalid token',
						statusCode: 401,
					},
					HttpStatus.UNAUTHORIZED,
				);
			}

			const data = await this.userRepository.findByToken(req.headers.authorization.replace('Bearer ', ''));

			if (!data) {
				throw new HttpException(
					{
						errors: [{ message: 'Unauthorized' }],
						message: 'Invalid token',
						statusCode: 401,
					},
					HttpStatus.UNAUTHORIZED,
				);
			}
		}

		try {
			await microserviceRequest({
				req,
				res,
				path: `/users/${handle}`,
				microservice: 'user',
				method: 'get',
			});
		} catch {
			throw new HttpException(
				{ errors: [{ message: 'Internal server error' }], message: 'Internal server error', status: 500 },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
