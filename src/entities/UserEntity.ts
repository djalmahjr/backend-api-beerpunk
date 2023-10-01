import {
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BeforeInsert
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FavoriteBeersEntity } from './FavoriteBeersEntity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	guid: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt?: Date;

	@BeforeInsert()
	async generateRandomGuid(): Promise<void> {
		if (!this.guid) {
			const guidUnique = uuid();
			this.guid = guidUnique;
		}
	}

	@OneToMany(
		() => FavoriteBeersEntity,
		(favoriteBeers) => favoriteBeers.user,
		{
			cascade: true
		}
	)
	favoriteBeers?: FavoriteBeersEntity[];
}
