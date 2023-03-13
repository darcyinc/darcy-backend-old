import { randomUUID } from 'node:crypto';
import type { Replace } from '@helpers/Replace';

export interface UserPrivateDataProps {
	email: string;
	hashedPassword: string;
	token: string;
}

export interface UserProps {
	avatar: string;
	bio: string;
	createdAt: Date;
	handle: string;
	name: string;
	privateData: UserPrivateDataProps;
}

export class User implements UserProps {
	private readonly _id: string;

	private readonly props: UserProps;

	public privateData: UserPrivateDataProps;

	public constructor(props: Replace<UserProps, { bio?: string; createdAt?: Date }>, id?: string) {
		this._id = id ?? randomUUID();
		this.privateData = props.privateData;

		this.props = {
			...props,
			bio: props.bio ?? '',
			createdAt: props.createdAt ?? new Date(),
		};
	}

	public get bio(): string {
		return this.props.bio;
	}

	public get createdAt(): Date {
		return this.props.createdAt;
	}

	public get email(): string {
		return this.props.privateData.email;
	}

	public get hashedPassword(): string {
		return this.props.privateData.hashedPassword;
	}

	public get token(): string {
		return this.props.privateData.token;
	}

	public get avatar(): string {
		return this.props.avatar;
	}

	public get handle(): string {
		return this.props.handle;
	}

	public get id(): string {
		return this._id;
	}

	public get name(): string {
		return this.props.name;
	}
}
