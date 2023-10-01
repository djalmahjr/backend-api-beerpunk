import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { messages } from 'joi-translation-pt-br';
import { messages as messagesAPI } from '../../i18n/pt';

export default async function editUserValidator(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> {
	try {
		const schema = Joi.object({
			name: Joi.string(),
			password: Joi.string(),
			email: Joi.string().email()
		});
		const schemaQuery = Joi.object({
			guid: Joi.string().required()
		});

		await schemaQuery.validateAsync(req.query, { messages });

		await schema.validateAsync(req.body, { messages });

		return next();
	} catch (err) {
		if (err instanceof ValidationError)
			return res.status(400).json({ error: err.message });
		console.log(err);
		return res.status(500).json({ error: messagesAPI.errorServer });
	}
}
