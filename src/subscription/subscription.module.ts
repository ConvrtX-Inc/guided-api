import { Module } from '@nestjs/common';
import SubscriptionController from './subscription.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [SubscriptionController],
  imports: [StripeModule],
})
export class SubscriptionModule {}
