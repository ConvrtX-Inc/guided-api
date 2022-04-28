import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEventFormsController } from './activity-event-forms.controller';
import { ActivityEventForms } from './activity-event-forms.entity';
import { ActivityEventFormsService } from './activity-event-forms.service';

@Module({
  controllers: [ActivityEventFormsController],
  providers: [ActivityEventFormsService],
  imports: [TypeOrmModule.forFeature([ActivityEventForms])],
})
export class ActivityEventFormsModule {}
