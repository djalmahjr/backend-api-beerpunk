import request from 'supertest';
import app from '../src/app';
import { connectionDB } from '../src/config/databaseConfig';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/entities';

let tokenUser: string;
let guidUser: string;
let connectDb: DataSource;

jest.setTimeout(30000);

beforeAll(async () => {
	connectDb = await connectionDB();
	const { body } = await request(app).post('/v1/auth').send({
		email: 'seeduser.apibeer@test.com',
		password: '12348765'
	});
	tokenUser = body?.token;
});

afterAll(async () => {
	await connectDb
		.createQueryBuilder()
		.delete()
		.from(UserEntity)
		.where({ guid: guidUser })
		.execute();
	return await connectDb.destroy();
});

describe('Create User Test', () => {
	it('Should be able create a User', async () => {
		const response = await request(app)
			.post('/v1/users')
			.set('Authorization', `Bearer ${tokenUser}`)
			.send({
				name: 'Teste Integration',
				email: 'testintegrationjest@test.com',
				password: '12345678'
			});
		console.log(response.body);
		expect(response.statusCode).toBe(200);
		guidUser = response.body.guid;
	});
	it('Should be able add a User already exists', async () => {
		const response = await request(app)
			.post('/v1/users')
			.set('Authorization', `Bearer ${tokenUser}`)
			.send({
				name: 'Teste Integration',
				email: 'testintegrationjest@test.com',
				password: '12345678'
			});
		console.log(response.body);
		expect(response.statusCode).toBe(400);
	});
});

describe('List User Controller', () => {
	it('Should be able find the User using name', async () => {
		const response = await request(app)
			.get('/v1/users?name=Teste Integration')
			.set('Authorization', `Bearer ${tokenUser}`)
			.send();

		expect(response.statusCode).toBe(200);
		expect(response.body?.length).toBeGreaterThan(0);
	});

	it('Should be able find the User using guid', async () => {
		const response = await request(app)
			.get(`/v1/users?guid=${guidUser}`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send();
		expect(response.statusCode).toBe(200);
		expect(response.body?.length).toBeGreaterThan(0);
	});

	it('Must not be able to find a User', async () => {
		const response = await request(app)
			.get(`/v1/users?name=supertestintegrationnotfound`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send();
		expect(response.body?.length).toBe(0);
	});
});

describe('Update User Controller', () => {
	it('Should be able to update an existing User', async () => {
		const response = await request(app)
			.put(`/v1/users?guid=${guidUser}`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send({
				name: 'Teste integration 2 LTDA'
			});

		expect(response.statusCode).toBe(200);
	});

	it('Must not be able to update an existing User', async () => {
		const response = await request(app)
			.put(`/v1/users?guid=${guidUser}-5649456`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send({
				name: '6455265454984'
			});

		expect(response.body?.error).toBe('Usuario não encontrado.');
	});
});

describe('Delete User Controller', () => {
	it('Must not be able to delete a User', async () => {
		const response = await request(app)
			.delete(`/v1/users?guid=${guidUser}-abc123`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send();

		expect(response.body?.error).toBe('Usuario não encontrado.');
	});
	it('Should be able to delete a User', async () => {
		const response = await request(app)
			.delete(`/v1/users?guid=${guidUser}`)
			.set('Authorization', `Bearer ${tokenUser}`)
			.send();

		expect(response.statusCode).toBe(200);
	});
});
