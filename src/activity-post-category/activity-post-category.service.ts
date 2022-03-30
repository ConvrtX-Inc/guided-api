import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityPostCategory } from './activity-post-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityPostCategoryService extends TypeOrmCrudService<ActivityPostCategory> {
  constructor(
    @InjectRepository(ActivityPostCategory)
    private actPostCategoryRepository: Repository<ActivityPostCategory>,
  ) {
    super(actPostCategoryRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPostCategory>) {
    return this.actPostCategoryRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPostCategory>) {
    return this.actPostCategoryRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<ActivityPostCategory>[]) {
    return this.actPostCategoryRepository.save(this.actPostCategoryRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.actPostCategoryRepository.softDelete(id);
  }
}
