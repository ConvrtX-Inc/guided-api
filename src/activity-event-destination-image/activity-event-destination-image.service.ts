import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { ActivityEventDestinationImage } from './activity-event-destination-image.entity';

@Injectable()
export class ActivityEventDestinationImageService extends TypeOrmCrudService<ActivityEventDestinationImage> {
  constructor(
    @InjectRepository(ActivityEventDestinationImage)
    private imgRepo: Repository<ActivityEventDestinationImage>,
  ) {
    super(imgRepo);
  }

  async findOneEntity(options: FindOptions<ActivityEventDestinationImage>) {
    return this.imgRepo.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityEventDestinationImage>) {
    return this.imgRepo.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityEventDestinationImage>) {
    return this.imgRepo.save(this.imgRepo.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.imgRepo.softDelete(id);
  }
}
