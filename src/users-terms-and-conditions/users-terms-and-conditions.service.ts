import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { UsersTermsAndCondition } from './users-terms-and-condition.entity';

@Injectable()
export class UsersTermsAndConditionsService extends TypeOrmCrudService<UsersTermsAndCondition> {
  constructor(
    @InjectRepository(UsersTermsAndCondition)
    private UsersTermsAndConditionsRepository: Repository<UsersTermsAndCondition>,
  ) {
    super(UsersTermsAndConditionsRepository);
  }

  async findOneEntity(options: FindOptions<UsersTermsAndCondition>) {
    return this.UsersTermsAndConditionsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UsersTermsAndCondition>) {
    return this.UsersTermsAndConditionsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UsersTermsAndCondition>[]) {
    return this.UsersTermsAndConditionsRepository.save(
      this.UsersTermsAndConditionsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.UsersTermsAndConditionsRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.UsersTermsAndConditionsRepository.delete(id);
  }
}
