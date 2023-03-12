import { AuthenticateUser } from '@application/use-cases/authenticate-user';
import { CreateUser } from '@application/use-cases/create-user';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserBody } from '../dtos/authenticate-user-body.js';
import { CreateUserBody } from '../dtos/create-user-body.js';

@Controller('auth')
export class AuthController {
	public constructor(private readonly createUser: CreateUser, private readonly authenticateUser: AuthenticateUser) {}

	@Post('users')
	public async create(@Body() body: CreateUserBody) {
		const { email, password } = body;

		const { token } = await this.createUser.execute({
			email,
			password,
		});

		return {
			token,
		};
	}

	@Post('users/login')
	public async authenticate(@Body() body: AuthenticateUserBody) {
		const { email, password } = body;

		const { token } = await this.authenticateUser.execute({
			email,
			password,
		});

		return {
			token,
		};
	}
}
