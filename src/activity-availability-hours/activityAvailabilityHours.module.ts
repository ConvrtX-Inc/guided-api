import { Module } from '@nestjs/common';
import { ActivityAvailabilityHoursController } from './activityAvailabilityHours.controller';
import { ActivityAvailabilityHoursService } from './activityAvailabilityHours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAvailabilityHours } from './activityAvailabilityHours.entity';

@Module({
  controllers: [ActivityAvailabilityHoursController],
  providers: [ActivityAvailabilityHoursService],
  imports: [TypeOrmModule.forFeature([ActivityAvailabilityHours])],
})
export class ActivityAvailabilityHoursModule {}
