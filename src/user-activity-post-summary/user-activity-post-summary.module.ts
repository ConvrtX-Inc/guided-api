import { Module } from '@nestjs/common';
import { UserActivityPostSummaryController } from './user-activity-post-summary.controller';
import { UserActivityPostSummaryService } from './user-activity-post-summary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityPostSummary } from './user-activity-post-summary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivityPostSummary])],
  controllers: [UserActivityPostSummaryController],
  providers: [UserActivityPostSummaryService],
  exports: [UserActivityPostSummaryService],
})
export class UserActivityPostSummaryModule {}
