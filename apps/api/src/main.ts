import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		bufferLogs: true,
		cors: {
			origin: true,
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
		},
	});

	app.useGlobalPipes(
		new ValidationPipe({
			errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
		}),
	);

	await app.listen(process.env.PORT as string, '0.0.0.0');
}

void bootstrap();
