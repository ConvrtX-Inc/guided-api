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

  async getNewsfeedImageByNewsfeedId(newsfeed_id: string) {
    return await this.newsfeedImageRepo.find({
      select: [
        'id',
        'activity_newsfeed_id',
        'firebase_snapshot_img',
        'filename',
      ],
      where: { activity_newsfeed_id: newsfeed_id },
    });
  }
}
