import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { BookingRequestModule } from 'src/booking-request/booking-request.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [BookingRequestModule,TypeOrmModule.forFeature([Notification])],
})
export class NotificationModule {}
