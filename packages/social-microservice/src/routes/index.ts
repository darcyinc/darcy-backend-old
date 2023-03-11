import type { AppInstance } from '../index';

export class Route {
	public constructor(private readonly fastify: AppInstance) {
		this.addRoutes();
	}

	private addRoutes() {
		this.fastify.post('/', async (_, res) => {
			return res.send({ message: 'Hello world!' });
		});
	}
}
