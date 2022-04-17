import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEventDestinationImageController } from './activity-event-destination-image.controller';
import { ActivityEventDestinationImage } from './activity-event-destination-image.entity';
import { ActivityEventDestinationImageService } from './activity-event-destination-image.service';

@Module({
  controllers: [ActivityEventDestinationImageController],
  providers: [ActivityEventDestinationImageService],
  imports: [TypeOrmModule.forFeature([ActivityEventDestinationImage])],
})
export class ActivityEventDestinationImageModule {}
