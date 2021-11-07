import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityPackageForms } from './activityPackageForms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityPackageFormsService extends TypeOrmCrudService<ActivityPackageForms> {
  constructor(
    @InjectRepository(ActivityPackageForms)
    private activityRepository: Repository<ActivityPackageForms>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPackageForms>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPackageForms>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityPackageForms>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }
}
