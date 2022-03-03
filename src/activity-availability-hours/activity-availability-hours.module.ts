import { Module } from '@nestjs/common';
import { ActivityAvailabilityHoursController } from './activity-availability-hours.controller';
import { ActivityAvailabilityHoursService } from './activity-availability-hours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAvailabilityHours } from './activity-availability-hours.entity';

@Module({
  controllers: [ActivityAvailabilityHoursController],
  providers: [ActivityAvailabilityHoursService],
  imports: [TypeOrmModule.forFeature([ActivityAvailabilityHours])],
})
export class ActivityAvailabilityHoursModule {}
