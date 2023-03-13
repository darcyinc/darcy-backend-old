import type { UserRepository } from '@application/repositories/user-repository';
import type { UserPrivateData } from '@darcyinc/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findByToken(token: string): Promise<UserPrivateData | null> {
		return this.prisma.userPrivateData.findFirst({
			where: {
				token,
			},
		});
	}
}
