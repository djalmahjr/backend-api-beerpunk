import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../entities';

export class CreateSeedUser1696158462257 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection
			.createQueryBuilder()
			.insert()
			.into(UserEntity)
			.values({
				guid: 'cac7637a-88d3-4647-8579-9fd536a4a234',
				name: 'Seed User',
				email: 'seeduser.apibeer@test.com',
				password:
					'$2b$10$quhxM53JFJnQnRM5qOlbAuPbHbzqkYi8bDP9EMCWZsIhRxkIAMVAi'
			})
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection
			.createQueryBuilder()
			.delete()
			.from(UserEntity)
			.where({ email: 'seeduser.apibeer@test.com' })
			.execute();
	}
}
