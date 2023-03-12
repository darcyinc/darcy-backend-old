import type { User } from '@application/entities/user';
import type { UserRepository } from '@application/repositories/user-repository';
import type { UserPrivateData } from '@darcyinc/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async create(user: User): Promise<void> {
		const { avatar, email, handle, hashedPassword, name, token } = user;

		await this.prisma.user.create({
			data: {
				name,
				handle,
				avatar,
				privateData: {
					create: {
						email,
						hashedPassword,
						token,
					},
				},
			},
		});
	}

	public async findByEmail(email: string): Promise<UserPrivateData | null> {
		const data = await this.prisma.userPrivateData.findUnique({
			where: {
				email,
			},
		});

		if (!data) return null;

		return data;
	}
}
