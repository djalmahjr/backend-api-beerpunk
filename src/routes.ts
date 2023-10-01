import express, { Response } from 'express';
import UserController from './controllers/userController';
import authMiddleware from './middlewares/AuthMiddleware';
import listUserValidator from './validators/user/list';
import AuthController from './controllers/authController';
import createUserValidator from './validators/user/create';
import editUserValidator from './validators/user/edit';
import destroyUserValidator from './validators/user/destroy';
import createAuthValidator from './validators/auth/auth';
import { messages } from './i18n/pt';

const routes = express.Router();

routes.route('/v1/auth').post(createAuthValidator, AuthController.create);

routes
	.route('/v1/users')
	.get(authMiddleware, listUserValidator, UserController.list)
	.post(authMiddleware, createUserValidator, UserController.create)
	.put(authMiddleware, editUserValidator, UserController.edit)
	.delete(authMiddleware, destroyUserValidator, UserController.destroy);

routes.use((_, res: Response) =>
	res.status(404).json({ error: messages.routeNotFound })
);
export { routes };
