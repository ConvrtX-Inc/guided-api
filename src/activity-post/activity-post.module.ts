import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPostController } from './activity-post.controller';
import { ActivityPostService } from './activity-post.service';
import { ActivityPost } from './activity-post.entity';
import { ActivityAdvertisementModule } from 'src/activity-advertisement/activityAdvertisement.module';
import { ActivityEventModule } from 'src/activity-event/activityEvent.module';
import { ActivityArticleModule } from 'src/activity-article/activity-article.module';
import { ActivityNewsfeedModule } from 'src/activity-newsfeed/activity-newsfeed.module';
import { ActivityOutfitterModule } from 'src/activity-outfitter/activityOutfitter.module';
import { ActivityPackageModule } from 'src/activity-package/activityPackage.module';

@Module({
  controllers: [ActivityPostController],
  providers: [ActivityPostService],
  imports: [
    ActivityNewsfeedModule,
    ActivityAdvertisementModule,    
    ActivityEventModule, 
    ActivityArticleModule,    
    ActivityOutfitterModule,
    ActivityPostModule,
    ActivityPackageModule,    
    TypeOrmModule.forFeature([ActivityPost])
  ]
})
export class ActivityPostModule {}
