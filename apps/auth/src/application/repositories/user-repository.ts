import type { UserPrivateData } from '@darcyinc/prisma';
import type { User } from '../entities/user';

export abstract class UserRepository {
	public abstract create(user: User): Promise<void>;
	public abstract findByEmail(email: string): Promise<UserPrivateData | null>;
}
