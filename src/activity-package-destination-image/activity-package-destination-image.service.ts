import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityPackageDestinationImage } from './activity-package-destination-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityPackageDestinationImageService extends TypeOrmCrudService<ActivityPackageDestinationImage> {
  constructor(
    @InjectRepository(ActivityPackageDestinationImage)
    private activityRepository: Repository<ActivityPackageDestinationImage>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPackageDestinationImage>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(
    options: FindOptions<ActivityPackageDestinationImage>,
  ) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityPackageDestinationImage>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }
}
