import { HttpStatus, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { ActivityAvailability } from './activity-availability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { SlotAvailabilityDto } from './dtos/availability-slot.dto';
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
      const data = await this.activityRepository
        .createQueryBuilder('activity_availability')
        .leftJoinAndMapOne(
          'activity_availability.activity_availability_hours',
          ActivityAvailabilityHours,
          'activity_availability_hours',
          'activity_availability_hours.activity_availability_id::text = activity_availability.id::text',
        )
        .where('activity_availability.id::text = :id', { id: slot.id })
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
            details: 'Something went wrong:' + e,
          },
        },
      };
    }
  }

  async updateSlotAvailability(dto: SlotAvailabilityDto, id: string) {
    try {
      const avail = await this.findOne({
        where: { id: id },
      });
      if (!avail) {
        return {
          status: HttpStatus.BAD_REQUEST,
          sent_data: dto,
          response: {
            data: {
              details: 'Activity Availability id is not found',
            },
          },
        };
      }
      dto.activity_package_id
        ? (avail.activity_package_id = dto.activity_package_id)
        : '';
      avail.availability_date = dto.availability_date;
      await avail.save();

      const availHour = await getRepository(ActivityAvailabilityHours)
        .createQueryBuilder('activity_availability_hours')
        .where(
          'activity_availability_hours.activity_availability_id::text = :id',
          {
            id: id,
          },
        )
        .getOne();
      if (availHour) {
        availHour.slots = dto.slots;
        availHour.availability_date_hour = dto.availability_date;
        await availHour.save();
      } else {
        const slotHours = new ActivityAvailabilityHours();
        slotHours.activity_availability_id = id;
        slotHours.slots = dto.slots;
        slotHours.availability_date_hour = dto.availability_date;
        await slotHours.save();
      }
      const data = await this.activityRepository
        .createQueryBuilder('activity_availability')
        .leftJoinAndMapOne(
          'activity_availability.activity_availability_hours',
          ActivityAvailabilityHours,
          'activity_availability_hours',
          'activity_availability_hours.activity_availability_id::text = activity_availability.id::text',
        )
        .where('activity_availability.id::text = :id', { id: id })
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
            details: 'Something went wrong:' + e,
          },
        },
      };
    }
  }
}
