import { microserviceRequest } from '@darcyinc/utils';
import type { AppInstance } from '../../index';
import { isValidToken as validateToken } from '../../shared/validateToken.js';

export default class Route {
	public constructor(private readonly fastify: AppInstance) {
		this.addRoutes();
	}

	private addRoutes() {
		this.fastify.get('/users/:handle', async (req, res) => {
			const { handle } = req.params as { handle: string };

			if (handle === '@me') {
				const isValidToken = await validateToken(req, res);
				if (!isValidToken) return;
			}

			try {
				await microserviceRequest({
					req,
					res,
					path: `/users/${handle}`,
					microservice: 'user',
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
