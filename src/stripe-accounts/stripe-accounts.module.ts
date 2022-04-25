import { Module } from '@nestjs/common';
import StripeAccountsController from './stripe-accounts.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [StripeAccountsController],
  imports: [StripeModule],
})
export class StripeAccountsModule {}
