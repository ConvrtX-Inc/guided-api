import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityPackageDestination } from './activity-package-destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityPackageDestinationService extends TypeOrmCrudService<ActivityPackageDestination> {
  constructor(
    @InjectRepository(ActivityPackageDestination)
    private activityRepository: Repository<ActivityPackageDestination>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPackageDestination>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPackageDestination>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityPackageDestination>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

}
