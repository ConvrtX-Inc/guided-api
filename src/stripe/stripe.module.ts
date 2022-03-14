import { Module } from '@nestjs/common';
import StripeService from './stripe.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [],
  providers: [StripeService],
  imports: [UsersModule],
  exports: [StripeService],
})
export class StripeModule {}
