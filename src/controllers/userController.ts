import { Request, Response } from 'express';
import { UserEntity } from '../entities';
import UserMapper from '../mappers/userMapper';
import { Like } from 'typeorm';
import bcrypt from 'bcrypt';
import { messages } from '../i18n/pt';

async function list(req: Request, res: Response) {
	try {
		const { guid, email, name } = req.query;
		const filters = {
			...(email ? { email: Like(`%${email}%`) } : {}),
			...(guid ? { guid: guid as string } : {}),
			...(name ? { name: Like(`%${name}%`) } : {})
		};
		const users = await UserEntity.find({
			where: filters
		});
		return res.status(200).json(UserMapper.map(users));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: messages.errorServer });
	}
}

async function create(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;

		const existUser = await UserEntity.findOne({ where: { email } });
		if (existUser)
			return res.status(400).json({ error: messages.userEmailFound });

		const hash = await bcrypt.hash(password, 10);
		const passwordHashed = hash;

		const user = await UserEntity.create({
			name,
			email,
			password: passwordHashed
		}).save({ reload: true });

		return res.status(200).json(UserMapper.map(user));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: messages.errorServer });
	}
}

async function edit(req: Request, res: Response) {
	try {
		const { guid } = req.query;
		const { email, password } = req.body;

		const user = await UserEntity.findOne({
			where: { guid: guid as string }
		});
		if (!user)
			return res.status(404).json({ error: messages.userNotFound });

		if (email && email !== user.email) {
			const existUser = await UserEntity.findOne({ where: { email } });
			if (existUser)
				return res.status(400).json({ error: messages.userEmailFound });
		}

		user.email = email || user.email;
		if (password) {
			const hash = await bcrypt.hash(password, 10);
			user.password = hash;
		}

		await user.save({ reload: true });

		return res.status(200).json(UserMapper.map(user));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: messages.errorServer });
	}
}

async function destroy(req: Request, res: Response) {
	try {
		const { guid } = req.query;

		const user = await UserEntity.findOne({
			where: { guid: guid as string }
		});
		if (!user)
			return res.status(404).json({ error: messages.userNotFound });

		await user.softRemove({ reload: true });

		return res.status(200).json({
			guid,
			email: user.email,
			deletedAt: user.deletedAt
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: messages.errorServer });
	}
}

export default {
	list,
	create,
	edit,
	destroy
};
