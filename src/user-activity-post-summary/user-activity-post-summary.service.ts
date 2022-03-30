import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserActivityPostSummary } from './user-activity-post-summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class UserActivityPostSummaryService extends TypeOrmCrudService<UserActivityPostSummary> {
  constructor(
    @InjectRepository(UserActivityPostSummary)
    private userTypeRepository: Repository<UserActivityPostSummary>,
  ) {
    super(userTypeRepository);
  }

  async findOneEntity(options: FindOptions<UserActivityPostSummary>) {
    return this.userTypeRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserActivityPostSummary>) {
    return this.userTypeRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<UserActivityPostSummary>[]) {
    return this.userTypeRepository.save(this.userTypeRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.userTypeRepository.softDelete(id);
  }
}
