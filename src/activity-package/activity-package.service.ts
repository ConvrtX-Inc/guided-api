import { HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { ActivityPackage } from './activity-package.entity';
import { ActivityAvailability } from '../activity-availability/activity-availability.entity';
import { ActivityAvailabilityHours } from '../activity-availability-hours/activity-availability-hours.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { ClosestActivityDto } from './dtos/activity-package.dto';

@Injectable()
export class ActivityPackageService extends TypeOrmCrudService<ActivityPackage> {
  constructor(
    @InjectRepository(ActivityPackage)
    private activityRepository: Repository<ActivityPackage>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPackage>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPackage>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityPackage>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

  async getActivityPackageByUser(user_id: string) {
    return this.activityRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async approvedActivityPackage(id: string) {
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;
      await post.save();
    }
  }

  async rejectActivityPackage(id: string) {
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;
      await post.save();
    }
  }

  async getActivityPackageBySearchText(text: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .where('activity.name LIKE :name', { name: `%${text}%` })
      .orWhere('activity.description LIKE :description', {
        description: `%${text}%`,
      })
      .orWhere('activity.address LIKE :address', { address: `%${text}%` })
      .getMany();
  }

  async checkActivityAvailability(id: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndMapMany(
        'activity.availability',
        ActivityAvailability,
        'availability',
        'activity.id = availability.activity_package_id',
      )
      .leftJoinAndMapMany(
        'activity.availabilityHours',
        ActivityAvailabilityHours,
        'availabilityHours',
        'activity.id = availabilityHours.activity_availability_id',
      )
      .where('activity.id = :id', { id: id })
      .getMany();
  }

  async getClosestActivity(dto: ClosestActivityDto) {
    try {
      const latitude = dto.latitude;
      const longitude = dto.longitude;
      const response = await this.connection.query(
        'SELECT * FROM ( SELECT activity_package_destination.activity_package_id , ( 3959 * acos( cos( radians( ' +
          latitude +
          ' ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ' +
          longitude +
          ' ) ) + sin( radians( ' +
          latitude +
          ' ) ) * sin( radians( latitude ) ) ) ) AS distance FROM activity_package_destination ) al WHERE distance < 5 ORDER BY distance LIMIT 20',
      );
      const arrayColumn = (arr, n) => arr.map((x) => x[n]);
      let data = arrayColumn(response, 'activity_package_id')
        .filter((x) => x)
        .join(',')
        .split(',');
      data = [...new Set(data)];
      const activityPackage = await this.activityRepository
        .createQueryBuilder('activity')
        .whereInIds(data)
        .getMany();
      return {
        status: HttpStatus.OK,
        response: {
          data: {
            details: activityPackage,
          },
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        response: {
          data: {
            details: 'Something went wrong:' + e.message,
          },
        },
      };
    }
  }
}
