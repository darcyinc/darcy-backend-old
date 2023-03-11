import { promisify } from 'node:util';
import { randomBetween } from '@darcyinc/utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface CreateUserDto {
	email: string;
	password: string;
}

const jwtSign = promisify(jwt.sign);

// Returns the user token if account creation is successful
export async function createUser({ email, password }: CreateUserDto) {
	const existingUser = await app.prisma.userPrivateData.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		throw new Error('A user with that email already exists.');
	}

	const baseUserhandle = email.split('@')[0]!.slice(0, 9);

	const randomNum = randomBetween(900, 999_999);
	// generate a random handle, like JohnDoe737218
	const handle = `${baseUserhandle}${randomNum}`;

	const randomSaltNum = randomBetween(1, 10);
	const hashedPassword = await bcrypt.hash(password, randomSaltNum);

	const token = (await jwtSign(hashedPassword, process.env.JWT_SECRET!)) as string;

	await app.prisma.user.create({
		data: {
			name: handle,
			handle,
			avatar: `http://localhost:2006/assets/random-avatar-1.png`,
			privateData: {
				create: {
					email,
					hashedPassword,
					token,
				},
			},
		},
	});

	return token;
}
