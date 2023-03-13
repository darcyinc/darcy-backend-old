import type { User } from '@darcyinc/prisma';

export abstract class UserRepository {
	public abstract getMe(token: string): Promise<User | null>;
	public abstract getUserByHandle(handle: string): Promise<User | null>;
}
