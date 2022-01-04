import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityAvailabilityHours } from './activity-availability-hours.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityAvailabilityHoursService extends TypeOrmCrudService<ActivityAvailabilityHours> {
  constructor(
    @InjectRepository(ActivityAvailabilityHours)
    private activityRepository: Repository<ActivityAvailabilityHours>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityAvailabilityHours>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityAvailabilityHours>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityAvailabilityHours>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }
}
