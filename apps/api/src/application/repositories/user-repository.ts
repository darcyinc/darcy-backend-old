import type { UserPrivateData } from '@darcyinc/prisma';

export abstract class UserRepository {
	public abstract findByToken(token: string): Promise<UserPrivateData | null>;
}
