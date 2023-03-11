import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../index.js';
import token from '../validators/token.js';

export async function isValidToken(req: FastifyRequest, res: FastifyReply) {
	const isValid = await token.safeParseAsync(req.headers.authorization);
	if (!req.headers.authorization || !isValid.success) {
		void res.status(401).send({
			errors: [{ message: 'Unauthorized' }],
			message: 'Invalid token',
			statusCode: 401,
		});
		return false;
	}

	const data = await prisma.userPrivateData.findFirst({
		where: {
			token: req.headers.authorization.replace('Bearer ', ''),
		},
	});

	if (!data) {
		void res.status(401).send({
			errors: [{ message: 'Unauthorized' }],
			message: 'Invalid token',
			statusCode: 401,
		});
		return false;
	}

	return true;
}
