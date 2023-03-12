import type { GetUser } from '@application/use-cases/get-user';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Controller('users')
export class UsersController {
	public constructor(private readonly getUser: GetUser) {}

	@Get(':handle')
	public async getUserRoute(@Param('handle') handle: string, @Req() req: FastifyRequest, @Res() res: FastifyReply) {
		this.getUser.execute({ handle, req, res });
	}
}
