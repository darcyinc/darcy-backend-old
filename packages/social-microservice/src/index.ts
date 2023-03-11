import { FastifyManager } from '@darcyinc/utils';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import fastify from 'fastify';

config({ path: __dirname + '/../../.env' });

export type AppInstance = typeof app;

declare global {
	// eslint-disable-next-line no-var
	var app: AppInstance;
}

const app = fastify();
app.prisma = new PrismaClient();

global.app = app;

const port = Number(process.env.SOCIAL_MICROSERVICE_PORT);

async function bootstrap() {
	// Add listener to add routes
	app.addHook('onRoute', (routeOptions) => {
		console.log(`[Social Microservice] Route added: [${routeOptions.method}] ${routeOptions.url}`);
	});

	app.setErrorHandler((_err, _req, reply) => {
		return reply.status(500).send({
			errors: [{ message: 'Internal server error' }],
			message: 'Internal server error',
			statusCode: 500,
		});
	});

	const manager = new FastifyManager(app);
	await manager.loadConsumers(__dirname + '/routes');

	await app.listen({ port });

	console.log('[Social Microservice] Server started on port', port);
}

void bootstrap();
