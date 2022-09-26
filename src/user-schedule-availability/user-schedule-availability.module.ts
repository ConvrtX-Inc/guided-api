import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserScheduleAvailabilityController } from './user-schedule-availability.controller';
import { UserScheduleAvailabilityService } from './user-schedule-availability.service';
import { UserScheduleAvailability } from './user-schedule-availability.entity';

@Module({
  controllers: [UserScheduleAvailabilityController],
  providers: [UserScheduleAvailabilityService],
  imports: [TypeOrmModule.forFeature([UserScheduleAvailability])],
  exports: [UserScheduleAvailabilityService],
})
export class UserScheduleAvailabilityModule {}
