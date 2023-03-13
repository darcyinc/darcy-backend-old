import type { User } from '@darcyinc/prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository.js';

interface GetUserRequest {
	handle: string;
	token: string;
}

interface GetUserResponse {
	user: User;
}

@Injectable()
export class GetUser {
	public constructor(private readonly userRepository: UserRepository) {}

	public async execute(request: GetUserRequest): Promise<GetUserResponse> {
		const { handle, token } = request;

		let user: User | null;

		if (handle === '@me') {
			user = await this.userRepository.getMe(token);
		} else user = await this.userRepository.getUserByHandle(handle);

		if (!user) {
			throw new HttpException(
				{
					message: 'User not found',
					errors: [{ message: 'User not found' }],
					statusCode: HttpStatus.NOT_FOUND,
				},
				HttpStatus.NOT_FOUND,
			);
		}

		return { user };
	}
}
