import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { ActivityEventDestination } from './activity-event-destination.entity';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityEventDestinationService extends TypeOrmCrudService<ActivityEventDestination> {
  constructor(
    @InjectRepository(ActivityEventDestination)
    private eventRepo: Repository<ActivityEventDestination>,
  ) {
    super(eventRepo);
  }

  async findOneEntity(options: FindOptions<ActivityEventDestination>) {
    return this.eventRepo.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityEventDestination>) {
    return this.eventRepo.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityEventDestination>) {
    return this.eventRepo.save(this.eventRepo.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.eventRepo.softDelete(id);
  }
}
