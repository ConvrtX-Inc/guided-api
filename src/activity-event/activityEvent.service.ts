import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityEvent } from './activityEvent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityEventService extends TypeOrmCrudService<ActivityEvent> {
  constructor(
    @InjectRepository(ActivityEvent)
    private activityRepository: Repository<ActivityEvent>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityEvent>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityEvent>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityEvent>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }
}
