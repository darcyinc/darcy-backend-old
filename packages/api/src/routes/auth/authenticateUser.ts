import { microserviceRequest } from '@darcyinc/utils';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AppInstance } from '../../index';

export default class Route {
	public constructor(private readonly fastify: AppInstance) {
		this.addRoutes();
	}

	private addRoutes() {
		this.fastify.post('/auth/users/login', async (req: FastifyRequest, res: FastifyReply) => {
			try {
				await microserviceRequest({
					req,
					res,
					path: '/auth/users/login',
					microservice: 'auth',
				});
			} catch {
				void res.status(500).send({
					errors: [{ message: 'Internal server error' }],
					message: 'Internal server error',
					status: 500,
				});
			}
		});
	}
}
