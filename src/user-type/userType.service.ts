import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserType } from './userType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class UserTypeService extends TypeOrmCrudService<UserType> {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {
    super(userTypeRepository);
  }

  async findOneEntity(options: FindOptions<UserType>) {
    return this.userTypeRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserType>) {
    return this.userTypeRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<UserType>[]) {
    return this.userTypeRepository.save(this.userTypeRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.userTypeRepository.softDelete(id);
  }
}
