import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const dataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST || 'localhost',
	port: Number(DB_PORT) || 5432,
	username: DB_USERNAME || 'postgres',
	password: DB_PASSWORD || '123456',
	database: DB_NAME || 'beerpunkdb',
	migrationsTableName: 'migration_execs',
	migrations: [resolve(__dirname, '..', 'migrations', '*{.ts,.js}')],
	entities: [resolve(__dirname, '..', 'entities', '*{.ts,.js}')],
	namingStrategy: new SnakeNamingStrategy(),
	logging: true
});

export async function connectionDB() {
	const pool = await dataSource.initialize();
	await pool.runMigrations();
	console.log('Connected in database with success.');

	return pool;
}

export default dataSource;
