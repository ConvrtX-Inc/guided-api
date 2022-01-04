import { Module } from '@nestjs/common';
import { ActivityAvailabilityController } from './activity-availability.controller';
import { ActivityAvailabilityService } from './activity-availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAvailability } from './activity-availability.entity';

@Module({
  controllers: [ActivityAvailabilityController],
  providers: [ActivityAvailabilityService],
  imports: [TypeOrmModule.forFeature([ActivityAvailability])],
})
export class ActivityAvailabilityModule {}
