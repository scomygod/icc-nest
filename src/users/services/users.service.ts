import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../models/user.model';

import { NotFoundException } from '../../exceptions/domain/not-found.exception';
import { ConflictException } from '../../exceptions/domain/conflict.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const entities = await this.userRepository.find();

    return entities.map((entity) => User.fromEntity(entity).toResponseDto());
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    return User.fromEntity(entity).toResponseDto();
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const exists = await this.userRepository.exist({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException(`El email ${dto.email} ya está registrado`);
    }

    const user = User.fromDto(dto);
    const saved = await this.userRepository.save(user.toEntity());

    return User.fromEntity(saved).toResponseDto();
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    const user = User.fromEntity(entity);
    user.update(dto);

    const saved = await this.userRepository.save(user.toEntity());
    return User.fromEntity(saved).toResponseDto();
  }

  async partialUpdate(
    id: number,
    dto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    const user = User.fromEntity(entity);
    user.partialUpdate(dto);

    const saved = await this.userRepository.save(user.toEntity());
    return User.fromEntity(saved).toResponseDto();
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }
  }
}
