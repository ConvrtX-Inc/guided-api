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
import { ActivityPackageDestination } from '../activity-package-destination/activity-package-destination.entity';
import { ActivityPackageDestinationImage } from '../activity-package-destination-image/activity-package-destination-image.entity';
import { getRepository } from 'typeorm';
import { Badge } from 'src/badge/badge.entity';

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
    const activity_package = await this.activityRepository
      .createQueryBuilder('activity')
      .where('activity.name LIKE :name', { name: `%${text}%` })
      .orWhere('activity.description LIKE :description', {
        description: `%${text}%`,
      })
      .orWhere('activity.address LIKE :address', { address: `%${text}%` })
      .getMany();

    for (const i in activity_package) {
      const main_badge = await getRepository(Badge)
        .createQueryBuilder('badge')
        .where("badge.id = '" + activity_package[i].main_badge_id + "'")
        .getOne();

      const activity_package_destination = await getRepository(
        ActivityPackageDestination,
      )
        .createQueryBuilder('activity_package_destination')
        .where(
          "activity_package_destination.activity_package_id = '" +
            activity_package[i].id +
            "'",
        )
        .getRawOne();

      activity_package[i]['main_badge'] = main_badge;
      activity_package[i]['activity_package_destination'] =
        activity_package_destination;
    }

    return activity_package;
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
      let details = [];
      const latitude = dto.latitude;
      const longitude = dto.longitude;
      const distance = dto.distance ?? 10;
      const response = await this.connection.query(
        `SELECT * FROM ( SELECT activity_package_destination.activity_package_id , ( 3959 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ${longitude} ) ) + sin( radians( ${latitude} ) ) * sin( radians( latitude ) ) ) ) AS distance FROM activity_package_destination ) al WHERE distance < ${distance} ORDER BY distance LIMIT 20`,
      );
      if (response.length) {
        const arrayColumn = (arr, n) => arr.map((x) => x[n]);
        let data = arrayColumn(response, 'activity_package_id')
          .filter((x) => x)
          .join(',')
          .split(',');
        data = [...new Set(data)];
        const activityPackage = await this.activityRepository
          .createQueryBuilder('activity')
          .leftJoinAndMapOne(
            'activity.destination',
            ActivityPackageDestination,
            'destination',
            'activity.id = destination.activity_package_id',
          )
          .leftJoinAndMapOne(
            'destination.destinationImage',
            ActivityPackageDestinationImage,
            'destinationImage',
            'destination.id = destinationImage.activity_package_destination_id',
          )
          .whereInIds(data)
          .getMany();
        const that = this;
        activityPackage.forEach(function (item, i) {
          const distance = that.getDistance(
            item.destination.latitude,
            item.destination.longitude,
            latitude,
            longitude,
            'K',
          );
          activityPackage[i].distance = distance + ' K';
          activityPackage[i].time_to_travel =
            that.calculateTimePerDistance(distance);
        });

        details = activityPackage;
      }
      return {
        status: HttpStatus.OK,
        response: {
          data: {
            details: details,
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

  calculateTimePerDistance(distance) {
    const averageSpeed = Math.floor(Math.random() * (50 - 20 + 1) + 20);
    let timePerSeconds = (distance * 1000) / (averageSpeed * 0.27);
    timePerSeconds = Number(timePerSeconds);
    const h = Math.floor(timePerSeconds / 3600);
    const m = Math.floor((timePerSeconds % 3600) / 60);
    return h + '.' + m + (h > 1 ? ' hours drive' : ' hour drive');
  }

  getDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  async getActivitypackageRange(start_date: string, end_date: string) {
    let response = [];
    const activityAvailability = await getRepository(ActivityAvailability)
      .createQueryBuilder()
      .select()
      .where(`availability_date BETWEEN '${start_date}' AND '${end_date}'`)
      .getMany();

    for (const i in activityAvailability) {
      const activityPackage = await getRepository(ActivityPackage)
        .createQueryBuilder()
        .select()
        .where("id = '" + activityAvailability[i].activity_package_id + "'")
        .getOne();

      const check = response.find((x) => x.id == activityPackage.id);
      if (!check) {
        const badge = await getRepository(Badge)
          .createQueryBuilder('badge')
          .where({ id: activityPackage.main_badge_id })
          .getOne();
        activityPackage['main_badge'] = badge;

        const activityPackageDestination = await getRepository(
          ActivityPackageDestination,
        )
          .createQueryBuilder('activity_package_destination')
          .where({ activity_package_id: activityPackage.id })
          .getRawOne();
        activityPackage['activity_package_destination'] =
          activityPackageDestination;

        response.push(activityPackage);
      }
    }

    return response;
  }
}
