import type { UserRepository } from '@application/repositories/user-repository';
import type { User } from '@darcyinc/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async getMe(token: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				privateData: {
					some: {
						token,
					},
				},
			},
		});
	}

	public async getUserByHandle(handle: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				handle,
			},
		});
	}
}
