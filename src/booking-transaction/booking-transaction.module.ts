import { Module } from '@nestjs/common';
import { BookingTransactionService } from './booking-transaction.service';
import { BookingTransactionController } from './booking-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingTransaction } from './booking-transaction.entity';

@Module({
  providers: [BookingTransactionService],
  controllers: [BookingTransactionController],
  exports: [BookingTransactionService],
  imports: [TypeOrmModule.forFeature([BookingTransaction])],
})
export class BookingTransactionModule {}
