import { UserEntity } from "../entities/user.entity/user.entity";

export class UserMapper {

  static toEntity(id: number, dto: any): UserEntity {
    return new UserEntity(id, dto.name, dto.email, dto.password);
  }

  static toResponse(entity: UserEntity) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}

