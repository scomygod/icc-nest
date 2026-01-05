import { UserEntity } from '../entities/user.entity/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UserMapper {
  // Para crear un usuario
  static fromCreateDto(dto: CreateUserDto): UserEntity {
    const entity = new UserEntity();
    entity.name = dto.name;
    entity.email = dto.email;
    entity.password = dto.password;
    return entity;
  }

  // Para actualizar un usuario
  static fromUpdateDto(id: number, dto: UpdateUserDto): UserEntity {
    const entity = new UserEntity();
    entity.id = id;
    entity.name = dto.name;
    entity.email = dto.email;
    entity.password = dto.password;
    return entity;
  }

  static toResponse(entity: UserEntity) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
