import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityNewsFeedImage } from './activity-newsfeed-image.entity';
import { ActivityNewsfeedImageController } from './activity-newsfeed-image.controller';
import { ActivityNewsfeedImageService } from './activity-newsfeed-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityNewsFeedImage])],
  controllers: [ActivityNewsfeedImageController],
  providers: [ActivityNewsfeedImageService],
})
export class ActivityNewsfeedImageModule {}
