import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey
} from 'typeorm';

export class CreateTableFavoriteBeers1696115732120
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'favorite_beers',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'beer_id',
						type: 'int'
					},
					{
						name: 'user_id',
						type: 'int'
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
		await queryRunner.createForeignKey(
			'favorite_beers',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE'
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('favorite_beers');
	}
}
