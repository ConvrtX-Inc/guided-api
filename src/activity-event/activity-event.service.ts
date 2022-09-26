import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityEvent } from './activity-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { EventUserAndStatusDto } from './dtos/event-user-status.dto';
import { StatusService } from 'src/statuses/status.service';
import { BookingRequestStatus } from 'src/booking-request/booking-request-status';

@Injectable()
export class ActivityEventService extends TypeOrmCrudService<ActivityEvent> {
  constructor(
    @InjectRepository(ActivityEvent)
    private activityRepository: Repository<ActivityEvent>,
    private statusService: StatusService,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityEvent>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityEvent>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityEvent>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

  async approvedEvent(id: string) {
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    const status = await this.statusService.findOne({
      status_name: BookingRequestStatus.approved,
    });
    if (post) {
      post.status_id = status.id;
      post.is_published = true;
      await post.save();
    }
  }

  async rejectEvent(id: string) {
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    const status = await this.statusService.findOne({
      status_name: BookingRequestStatus.rejected,
    });
    if (post) {
      post.status_id = status.id;
      post.is_published = false;
      await post.save();
    }
  }

  async getEventsByUserAndStatus(eventUserAndStatusDto: EventUserAndStatusDto) {
    return this.activityRepository.find({
      where: {
        user_id: eventUserAndStatusDto.user_id,
        status_id: eventUserAndStatusDto.status_id,
      },
    });
  }
}
