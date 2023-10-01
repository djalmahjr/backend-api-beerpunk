const jwtSecret =
	(process.env.AUTH_SECRET_API as string) ||
	'b207269327f40a58a40f6ab175fb0d01b3ae57aebfaf370d7d5a177741e3b526';

export { jwtSecret };
