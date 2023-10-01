import { BaseArrayMap, BaseMap, BaseObjectMap } from '../types/Mapper';
import { UserEntity } from '../entities';
import { UserMapped } from '../types/User';

const map: BaseMap<UserMapped, UserEntity> = (
	data: UserEntity[] | UserEntity
) => {
	if (!Array.isArray(data)) {
		return objectMap(data);
	} else {
		return arrayMap(data);
	}
};

const arrayMap: BaseArrayMap<UserMapped, UserEntity> = (
	array: UserEntity[]
) => {
	const mapped = [];
	for (const object of array) {
		mapped.push(objectMap(object));
	}

	return mapped;
};

const objectMap: BaseObjectMap<UserMapped, UserEntity> = (
	object: UserEntity
) => {
	return {
		guid: object.guid,
		email: object.email,
		createdAt: object.createdAt,
		updatedAt: object.updatedAt
	};
};

export default {
	map,
	arrayMap,
	objectMap
};
