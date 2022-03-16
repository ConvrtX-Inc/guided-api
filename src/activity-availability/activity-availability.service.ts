import { HttpStatus, Injectable } from '@nestjs/common';
import { Column, Repository } from 'typeorm';
import { ActivityAvailability } from './activity-availability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { SlotAvailabilityDto } from './dtos/availability-slot.dto';
import { Allow, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityAvailabilityHours } from '../activity-availability-hours/activity-availability-hours.entity';

@Injectable()
export class ActivityAvailabilityService extends TypeOrmCrudService<ActivityAvailability> {
  constructor(
    @InjectRepository(ActivityAvailability)
    private activityRepository: Repository<ActivityAvailability>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityAvailability>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityAvailability>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityAvailability>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

  async createSlotAvailability(dto: SlotAvailabilityDto) {
    try {
      const slot = await this.saveEntity({
        activity_package_id: dto.activity_package_id,
        availability_date: dto.availability_date,
      });
      const slotHours = new ActivityAvailabilityHours();
      slotHours.activity_availability_id = slot.id;
      slotHours.slots = dto.slots;
      slotHours.availability_date_hour = dto.availability_date;
      await slotHours.save();
      const data = this.activityRepository
        .createQueryBuilder('activity_availability')
        .leftJoinAndMapOne(
          'activity_availability.activity_availability_hours',
          ActivityAvailabilityHours,
          'activity_availability_hours',
          'activity_availability.id = activity_availability.activity_availability_id',
        )
        .where('activity_availability.id = :id', { id: slot.id })
        .getOne();
      return {
        status: HttpStatus.OK,
        sent_data: dto,
        response: {
          data: {
            details: data,
          },
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        sent_data: dto,
        response: {
          data: {
            details: 'Something went wrong:'+e,
          },
        },
      };
    }
  }

  async updateSlotAvailability(dto: SlotAvailabilityDto, id: string) {
    return Promise.resolve(undefined);
  }
}
