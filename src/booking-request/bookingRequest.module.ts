import { Module } from '@nestjs/common';
import { BookingRequestController } from './bookingRequest.controller';
import { BookingRequestService } from './bookingRequest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingRequest } from './bookingRequest.entity';

@Module({
  controllers: [BookingRequestController],
  providers: [BookingRequestService],
  imports: [TypeOrmModule.forFeature([BookingRequest])],
})
export class BookingRequestModule {}
