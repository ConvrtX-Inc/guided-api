import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityAvailability } from './activityAvailability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityAvailabilityService extends TypeOrmCrudService<ActivityAvailability> {
  constructor(
    @InjectRepository(ActivityAvailability)
    private activityRepository: Repository<ActivityAvailability>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityAvailability>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityAvailability>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityAvailability>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }
}
