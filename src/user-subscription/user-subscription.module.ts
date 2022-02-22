import { Module } from '@nestjs/common';
import { UserSubscriptionController } from './user-subscription.controller';
import { UserSubscriptionService } from './user-subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscription } from './user-subscription.entity';

@Module({
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService],
  imports: [TypeOrmModule.forFeature([UserSubscription])],
})
export class UserSubscriptionModule {}
