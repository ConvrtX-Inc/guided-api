import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEventDestinationController } from './activity-event-destination.controller';
import { ActivityEventDestination } from './activity-event-destination.entity';
import { ActivityEventDestinationService } from './activity-event-destination.service';

@Module({
  controllers: [ActivityEventDestinationController],
  providers: [ActivityEventDestinationService],
  imports: [TypeOrmModule.forFeature([ActivityEventDestination])],
})
export class ActivityEventDestinationModule {}
