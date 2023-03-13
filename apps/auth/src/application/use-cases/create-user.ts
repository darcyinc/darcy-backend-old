import { promisify } from 'node:util';
import { User } from '@application/entities/user';
import { randomBetween } from '@darcyinc/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository.js';

interface CreateUserRequest {
	email: string;
	password: string;
}

interface CreateUserResponse {
	token: string;
}

const jwtSign = promisify(jwt.sign);

@Injectable()
export class CreateUser {
	public constructor(private readonly userRepository: UserRepository) {}

	public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
		const { email, password } = request;

		const existingUser = await this.userRepository.findByEmail(email);

		if (existingUser) {
			throw new HttpException('A user with that email already exists.', HttpStatus.UNAUTHORIZED);
		}

		const baseUserhandle = email.split('@')[0]!.slice(0, 9);

		const randomNum = randomBetween(900, 999_999);

		const handle = `${baseUserhandle}${randomNum}`;

		const randomSaltNum = randomBetween(1, 10);

		const hashedPassword = await bcrypt.hash(password, randomSaltNum);

		const token = (await jwtSign(hashedPassword, process.env.JWT_SECRET!)) as string;

		const user = new User({
			name: handle,
			handle,
			avatar: `http://localhost:2006/assets/random-avatar-1.png`,
			privateData: {
				email,
				hashedPassword,
				token,
			},
		});

		await this.userRepository.create(user);

		return { token };
	}
}
