import { Module } from '@nestjs/common';
import { ActivityEventController } from './activityEvent.controller';
import { ActivityEventService } from './activityEvent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEvent } from './activityEvent.entity';

@Module({
  controllers: [ActivityEventController],
  providers: [ActivityEventService],
  imports: [TypeOrmModule.forFeature([ActivityEvent])],
})
export class ActivityEventModule {}
