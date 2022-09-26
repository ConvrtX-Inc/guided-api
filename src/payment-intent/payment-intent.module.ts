import { Module } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentIntentController } from './payment-intent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentIntent } from './payment-intent.entity';

@Module({
  imports: [PaymentIntentModule, TypeOrmModule.forFeature([PaymentIntent])],
  controllers: [PaymentIntentController],
  providers: [PaymentIntentService],
  exports: [PaymentIntentService],
})
export class PaymentIntentModule {}
