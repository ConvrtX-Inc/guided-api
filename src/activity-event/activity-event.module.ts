import { Module } from '@nestjs/common';
import { ActivityEventController } from './activity-event.controller';
import { ActivityEventService } from './activity-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEvent } from './activity-event.entity';
import { StatusModule } from 'src/statuses/status.module';

@Module({
  controllers: [ActivityEventController],
  providers: [ActivityEventService],
  imports: [
    StatusModule,
    TypeOrmModule.forFeature([ActivityEvent])
  ],
  exports: [ActivityEventService]
})
export class ActivityEventModule { }
