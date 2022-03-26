import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { Guideline } from 'src/guidelines/entities/guideline.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { DashboardRelatedController } from './dashboard-related.controller';
import { DashboardRelatedService } from './dashboard-related.service';

@Module({
  controllers: [DashboardRelatedController],
  providers: [DashboardRelatedService],
  imports: [
    TypeOrmModule.forFeature([User, Guideline, Transaction, ActivityPost]),
  ],
})
export class DashboardRelatedModule {}
