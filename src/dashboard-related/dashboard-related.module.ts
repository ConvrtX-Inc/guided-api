import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { Guideline } from 'src/guidelines/entities/guideline.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { DashboardRelatedController } from './dashboard-related.controller';
import { DashboardRelatedService } from './dashboard-related.service';
import { ActivityPackage } from 'src/activity-package/activity-package.entity';
import { ActivityNewsfeed } from 'src/activity-newsfeed/activity-newsfeed.entity';
import { ActivityEvent } from 'src/activity-event/activity-event.entity';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityAdvertisement } from 'src/activity-advertisement/entities/activity-advertisement.entity';
import { ActivityOutfitter } from 'src/activity-outfitter/entities/activityOutfitter.entity';
import { UserActivityPostSummary } from 'src/user-activity-post-summary/user-activity-post-summary.entity';

@Module({
  controllers: [DashboardRelatedController],
  providers: [DashboardRelatedService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Guideline,
      Transaction,
      ActivityPost,
      ActivityPackage,
      ActivityNewsfeed,
      ActivityEvent,
      ActivityArticle,
      ActivityAdvertisement,
      ActivityOutfitter,
      UserActivityPostSummary,
    ]),
  ],
})
export class DashboardRelatedModule {}
