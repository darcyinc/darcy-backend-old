import { Controller, Get, Param, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { GetUser } from '../../../application/use-cases/get-user.js';

@Controller('users')
export class UsersController {
	public constructor(private readonly getUser: GetUser) {}

	@Get(':handle')
	public async execute(@Param('handle') handle: string, @Req() req: FastifyRequest) {
		const token = req.headers.authorization!;

		const { user } = await this.getUser.execute({ handle, token });

		return {
			user,
		};
	}
}
