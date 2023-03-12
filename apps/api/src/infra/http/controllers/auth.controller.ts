import { AuthenticateUser } from '@application/use-cases/authenticate-user';
import { CreateUser } from '@application/use-cases/create-user';
import { Controller, Post, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
	public constructor(private readonly createUser: CreateUser, private readonly authenticateUser: AuthenticateUser) {}

	@Post('users')
	public async createUserRoute(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
		this.createUser.execute({ req, res, path: '/auth/users', microservice: 'auth' });
	}

	@Post('users/login')
	public async authenticateUserRoute(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
		this.authenticateUser.execute({ req, res, path: '/auth/users/login', microservice: 'auth' });
	}
}
