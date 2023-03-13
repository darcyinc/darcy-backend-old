import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user-repository.js';

interface AuthenticateUserRequest {
	email: string;
	password: string;
}

interface AuthenticateUserResponse {
	token: string;
}

@Injectable()
export class AuthenticateUser {
	public constructor(private readonly userRepository: UserRepository) {}

	public async execute(request: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const { email, password } = request;

		const existingUser = await this.userRepository.findByEmail(email);

		if (!existingUser) {
			throw new HttpException('Incorrect email or password.', HttpStatus.UNAUTHORIZED);
		}

		const isSamePassword = await bcrypt.compare(password, existingUser.hashedPassword);

		if (!isSamePassword) {
			throw new HttpException('Incorrect email or password.', HttpStatus.UNAUTHORIZED);
		}

		return {
			token: existingUser.token as string,
		};
	}
}
