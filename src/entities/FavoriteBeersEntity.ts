import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class FavoriteBeersEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	beer_id: number;

	@Column()
	user_id: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt?: Date;

	@ManyToOne(() => UserEntity, (user) => user.favoriteBeers)
	user?: UserEntity;
}
