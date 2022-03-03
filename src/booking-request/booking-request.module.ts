import { Module } from '@nestjs/common';
import { BookingRequestController } from './booking-request.controller';
import { BookingRequestService } from './booking-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingRequest } from './booking-request.entity';
import { Status } from 'src/statuses/status.entity';

@Module({
  controllers: [BookingRequestController],
  providers: [BookingRequestService],
  imports: [TypeOrmModule.forFeature([BookingRequest,Status])],
})
export class BookingRequestModule {}
