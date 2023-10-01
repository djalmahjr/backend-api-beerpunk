import { SigningKeyCallback } from 'jsonwebtoken';

export interface Token extends SigningKeyCallback {
	guid: string;
	isAdmin?: boolean;
}

export type JwtPromisify = (
	token: string,
	secret: string
) => Promise<SigningKeyCallback>;
