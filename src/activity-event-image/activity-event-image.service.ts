import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityEventImage } from './entities/activity-event-image.entity';
import { FindOptions } from '../utils/types/find-options.type';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityEventImageService extends TypeOrmCrudService<ActivityEventImage>{
  constructor(@InjectRepository(ActivityEventImage)
  private activityEventImageRepository: Repository<ActivityEventImage>,
    ) {
      super(activityEventImageRepository);
    }
    async findOneEntity(options: FindOptions<ActivityEventImage>) {
      return this.activityEventImageRepository.findOne({
        where: options.where,
      });
    }
  
    async findManyEntities(
      options: FindOptions<ActivityEventImage>,
    ) {
      return this.activityEventImageRepository.find({
        where: options.where,
      });
    }
    async saveEntity(data: DeepPartial<ActivityEventImage>) {
      return this.activityEventImageRepository.save(this.activityEventImageRepository.create(data));
    }
  
    async softDelete(id: number): Promise<void> {
      await this.activityEventImageRepository.softDelete(id);
    }
}
