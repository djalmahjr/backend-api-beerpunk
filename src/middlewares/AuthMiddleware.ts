import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { messages } from '../i18n/pt';
import { jwtSecret } from '../config/authConfig';
import { UserEntity } from '../entities';
import { JwtPromisify, Token } from '../types/Auth';

export default async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;

	if (!authHeader)
		return res.status(400).json({ error: messages.tokenNotProvided });

	const [, token] = authHeader.split(' ');

	try {
		const decoded = (await (promisify(jwt.verify) as JwtPromisify)(
			token,
			jwtSecret
		)) as Token;

		const user = await UserEntity.findOne({
			where: {
				guid: decoded?.guid
			}
		});

		req.currentUser = user;

		if (!user)
			return res.status(403).json({ error: messages.userNotAutenticate });

		return next();
	} catch (err) {
		console.log('Error: JWTValidator' + err);
		if (err?.message.includes('invalid token'))
			return res.status(403).json({ error: messages.userNotAutenticate });
		return res.status(403).json({ error: messages.errorServer });
	}
}
