import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1696109248655 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'guid',
						type: 'varchar(255)',
						isUnique: true,
						generationStrategy: 'uuid'
					},
					{
						name: 'name',
						type: 'varchar(255)'
					},
					{
						name: 'email',
						type: 'varchar(255)',
						isUnique: true
					},
					{
						name: 'password',
						type: 'varchar(255)'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
