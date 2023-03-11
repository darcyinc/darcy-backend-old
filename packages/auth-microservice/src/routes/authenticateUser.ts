import HttpStatusCode from 'http-status-codes';
import type { AppInstance } from '../index';
import authenticateUser from '../services/authenticateUser.js';
import type { CreateUserDto } from '../services/createUser.js';
import credentials from '../validators/credentials.js';

export default class Route {
	public constructor(private readonly fastify: AppInstance) {
		this.addRoutes();
	}

	private addRoutes() {
		this.fastify.post('/auth/users/login', async (req, res) => {
			const { email, password } = (req.body ?? {}) as CreateUserDto;
			const result = await credentials.safeParseAsync({ email, password });

			if (!result.success) {
				return res.status(400).send({
					errors: result.error.issues,
				});
			}

			try {
				const token = await authenticateUser({ email, password });

				void res.send({ token });
			} catch (error: any) {
				if (error.message === 'Incorrect email or password.')
					return res.status(HttpStatusCode.CONFLICT).send({
						errors: [{ message: error.message }],
					});

				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
					errors: [{ message: error.message }],
				});
			}
		});
	}
}
