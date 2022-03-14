import { Module } from '@nestjs/common';
import SubscriptionController from './subscription.controller';
import { StripeModule } from 'src/stripe/stripe.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SubscriptionController],
  imports: [StripeModule, UsersModule],
})
export class SubscriptionModule {}
