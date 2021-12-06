import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { ActivityNewsfeed } from './activity-newsfeed.entity';

@Injectable()
export class ActivityNewsfeedService extends TypeOrmCrudService<ActivityNewsfeed> {
  constructor(
    @InjectRepository(ActivityNewsfeed)
    private activityPostRepository: Repository<ActivityNewsfeed>
  ) {
    super(activityPostRepository);
  }

  async findOneEntity(options: FindOptions<ActivityNewsfeed>) {
    return this.activityPostRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityNewsfeed>) {
    return this.activityPostRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<ActivityNewsfeed>[]) {
    return this.activityPostRepository.save(this.activityPostRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityPostRepository.softDelete(id);
  }
 
  async approvedNewsfeed(id: string) {    
    const post = await this.activityPostRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;      
      await post.save();
    }
  }

  async rejectNewsfeed(id: string) {    
    const post = await this.activityPostRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;      
      await post.save();
    }
  }
}
