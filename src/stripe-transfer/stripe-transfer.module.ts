import { Module } from '@nestjs/common';
import StripeTransferController from './stripe-transfer.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [StripeTransferController],
  imports: [StripeModule],
})
export class StripeTransferModule {}
