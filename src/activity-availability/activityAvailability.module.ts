import { Module } from '@nestjs/common';
import { ActivityAvailabilityController } from './activityAvailability.controller';
import { ActivityAvailabilityService } from './activityAvailability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAvailability } from './activityAvailability.entity';

@Module({
  controllers: [ActivityAvailabilityController],
  providers: [ActivityAvailabilityService],
  imports: [TypeOrmModule.forFeature([ActivityAvailability])],
})
export class ActivityAvailabilityModule {}
