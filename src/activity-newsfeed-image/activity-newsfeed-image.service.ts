import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityNewsFeedImage } from './activity-newsfeed-image.entity';

@Injectable()
export class ActivityNewsfeedImageService extends TypeOrmCrudService<ActivityNewsFeedImage> {
  constructor(
    @InjectRepository(ActivityNewsFeedImage)
    private newsfeedImageRepo: Repository<ActivityNewsFeedImage>,
  ) {
    super(newsfeedImageRepo);
  }
}
