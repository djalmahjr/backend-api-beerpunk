import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { messages } from 'joi-translation-pt-br';
import { messages as messagesAPI } from '../../i18n/pt';

export default async function createAuthValidator(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> {
	try {
		const schema = Joi.object({
			password: Joi.string().required(),
			email: Joi.string().email().required()
		});

		await schema.validateAsync(req.body, { messages });
		return next();
	} catch (err) {
		if (err instanceof ValidationError)
			return res.status(400).json({ error: err.message });
		console.log(err);
		return res.status(500).json({ error: messagesAPI.errorServer });
	}
}
