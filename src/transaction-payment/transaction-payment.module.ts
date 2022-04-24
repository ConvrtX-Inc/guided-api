import { Module } from '@nestjs/common';
import { TransactionPaymentService } from './transaction-payment.service';
import { TransactionPaymentController } from './transaction-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionPayment } from './transaction-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionPayment])],
  controllers: [TransactionPaymentController],
  providers: [TransactionPaymentService]
})
export class TransactionPaymentModule {}
