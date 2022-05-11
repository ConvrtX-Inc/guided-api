import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { ActivityAvailabilityHours } from './activity-availability-hours.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { ActivityAvailability } from 'src/activity-availability/activity-availability.entity';

@Injectable()
export class ActivityAvailabilityHoursService extends TypeOrmCrudService<ActivityAvailabilityHours> {
  constructor(
    @InjectRepository(ActivityAvailabilityHours)
    private activityRepository: Repository<ActivityAvailabilityHours>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityAvailabilityHours>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityAvailabilityHours>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityAvailabilityHours>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

  async getActivityAvailabilityHours(activity_package_id: string, start_date: string, end_date: string) {
    let response = [];
    const activityAvailability = await getRepository(ActivityAvailability)
      .createQueryBuilder()
      .select()
      .where("activity_package_id = '" + activity_package_id + "'")
      .andWhere(`availability_date BETWEEN '${start_date}' AND '${end_date}'`)
      .getMany();

    for (const i in activityAvailability) {
      const activityAvailabilityHours = await getRepository(ActivityAvailabilityHours)
        .createQueryBuilder()
        .select()
        .where("activity_availability_id = '" + activityAvailability[i].id + "'")
        .getMany();

      activityAvailability[i]['activity_availability_hours'] = activityAvailabilityHours;
      response.push(activityAvailability[i]);
    }

    return response;
  }
}
