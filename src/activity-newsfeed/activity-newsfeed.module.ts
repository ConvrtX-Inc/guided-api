import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityNewsfeedService } from './activity-newsfeed.service';
import { ActivityNewsfeedController } from './activity-newsfeed.controller';
import { ActivityNewsfeed } from './activity-newsfeed.entity';

@Module({
  providers: [ActivityNewsfeedService],
  controllers: [ActivityNewsfeedController],
  imports: [TypeOrmModule.forFeature([ActivityNewsfeed])],
  exports: [ActivityNewsfeedService],
})
export class ActivityNewsfeedModule {}
