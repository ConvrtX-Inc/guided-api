import { Module } from '@nestjs/common';
import { ActivityEventImageService } from './activity-event-image.service';
import { ActivityEventImageController } from './activity-event-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEventImage } from './entities/activity-event-image.entity';

@Module({
  controllers: [ActivityEventImageController],
  providers: [ActivityEventImageService],
  imports: [TypeOrmModule.forFeature([ActivityEventImage])],
})
export class ActivityEventImageModule {}
