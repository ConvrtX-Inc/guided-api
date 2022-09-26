import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityPackageDestination } from '../activity-package-destination/activity-package-destination.entity';
import { ActivityPackage } from '../activity-package/activity-package.entity';
import { ActivityPackageDestinationImage } from '../activity-package-destination-image/activity-package-destination-image.entity';
import { User } from '../users/user.entity';
import { UserReview } from '../user-review/user-review.entity';
import { Badge } from '../badge/badge.entity';

@Injectable()
export class NearbyActivitiesService {
  constructor(
    @InjectRepository(ActivityPackageDestination)
    private destinationRepo: Repository<ActivityPackageDestination>,
    @InjectRepository(ActivityPackage)
    private activityRepo: Repository<ActivityPackage>,
    @InjectRepository(ActivityPackageDestinationImage)
    private destinationImageRepo: Repository<ActivityPackageDestinationImage>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async nearbyDestinations(
    lat: number,
    lng: number,
    distance: number,
    searchText = '',
  ) {
    return this.destinationRepo
      .createQueryBuilder('destination')
      .leftJoinAndMapOne(
        'destination.activity',
        ActivityPackage,
        'activity',
        'activity.id = destination.activity_package_id',
      )
      .leftJoinAndMapOne(
        'activity.badge',
        Badge,
        'badge',
        'badge.id = activity.main_badge_id',
      )
      .select(['destination', 'badge'])
      .addSelect(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS destination_distance`,
      )
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      .andWhere(
        'LOWER(CONCAT(badge.badge_name, badge.badge_description)) LIKE :text',
        { text: `%${searchText}%` },
      )
      .orderBy('destination_distance')
      .getRawMany();
  }

  async nearbyActivitiesList(lat: number, lng: number, distance: number) {
    return this.activityRepo
      .createQueryBuilder('activity')
      .leftJoinAndMapMany(
        'activity.destination',
        ActivityPackageDestination,
        'destination',
        'activity.id = destination.activity_package_id',
      )
      .leftJoinAndMapMany(
        'destination.destinationImage',
        ActivityPackageDestinationImage,
        'destinationImage',
        'destination.id = destinationImage.activity_package_destination_id',
      )
      .leftJoinAndMapOne(
        'activity.user',
        User,
        'user',
        'user.id = activity.user_id',
      )
      .select([
        'activity',
        'destination',
        'destinationImage',
        'user.first_name',
        'user.last_name',
        'user.phone_no',
        'user.email',
      ])
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      .getMany();
  }

  async nearbyPopularGuidesforHome(lat: number, lng: number, distance: number) {
    return (
      this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndMapMany(
          'user.activity',
          ActivityPackage,
          'activity',
          'user.id = activity.user_id',
        )
        .leftJoinAndMapMany(
          'activity.badge',
          Badge,
          'badge',
          'badge.id = activity.main_badge_id',
        )
        .leftJoinAndMapMany(
          'activity.destination',
          ActivityPackageDestination,
          'destination',
          'activity.id = destination.activity_package_id',
        )
        .select(['activity', 'badge'])
        .addSelect((reviewsCount) => {
          return reviewsCount
            .select('CAST(COUNT(review.id) AS INTEGER)', 'count')
            .from(UserReview, 'review')
            .where('review.guide_user_id = user.id')
            .limit(1);
        }, 'reviews')
        .addSelect(
          `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS distance`,
        )
        .where(
          `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
          { distance: distance },
        )
        //.andWhere('user.is_verified = true')
        .orderBy('reviews', 'DESC')
        .addOrderBy('distance', 'ASC')
        .getRawMany()
    );
  }

  async nearbyPopularGuidesList(
    lat: number,
    lng: number,
    distance: number,
    searchText = '',
  ) {
    const users = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndMapMany(
        'user.activity',
        ActivityPackage,
        'activity',
        'user.id = activity.user_id',
      )
      .leftJoinAndMapMany(
        'activity.badge',
        Badge,
        'badge',
        'badge.id = activity.main_badge_id',
      )
      .leftJoinAndMapMany(
        'activity.destination',
        ActivityPackageDestination,
        'destination',
        'activity.id = destination.activity_package_id',
      )
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.phone_no',
        'user.email',
        'user.is_for_the_planet',
        'user.is_first_aid_trained',
        'activity',
        'badge',
      ])
      .addSelect((reviewsCount) => {
        return reviewsCount
          .select('CAST(COUNT(review.id) AS INTEGER)', 'count')
          .from(UserReview, 'review')
          .where('review.guide_user_id = user.id')
          .limit(1);
      }, 'reviews')
      .addSelect(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS distance`,
      )
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      //.andWhere('user.is_verified = true')
      .andWhere(
        'LOWER(CONCAT(badge.badge_name, badge.badge_description)) LIKE :text',
        { text: `%${searchText}%` },
      )
      .orderBy('reviews', 'DESC')
      .addOrderBy('distance', 'ASC')
      .getRawMany();

    for (const i in users) {
      const badge = await getRepository(Badge)
        .createQueryBuilder('badge')
        .where({ id: users[i].activity_main_badge_id })
        .getOne();
      if (badge !== null) {
        users[i]['badge_img_icon'] = badge.img_icon;
      }

      const activity = await getRepository(ActivityPackage)
        .createQueryBuilder('activity')
        .where({ id: users[i].activity_id })
        .getOne();

      if (activity !== null) {
        users[i]['activity_cover_img'] = activity.cover_img;
      }
    }

    return users;
  }

  async nearbyPopularGuidesDetail(
    lat: number,
    lng: number,
    distance: number,
    id: string,
  ) {
    return (
      this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndMapMany(
          'user.activity',
          ActivityPackage,
          'activity',
          'user.id = activity.user_id',
        )
        .leftJoinAndMapOne(
          'activity.badge',
          Badge,
          'badge',
          'badge.id = activity.main_badge_id',
        )
        .leftJoinAndMapMany(
          'activity.destination',
          ActivityPackageDestination,
          'destination',
          'activity.id = destination.activity_package_id',
        )
        .leftJoinAndMapMany(
          'user.review',
          UserReview,
          'review',
          'review.guide_user_id = user.id',
        )
        .select([
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.phone_no',
          'user.email',
          'user.is_for_the_planet',
          'user.is_first_aid_trained',
          'activity',
          'badge',
          'destination',
          'review',
        ])
        .addSelect(
          `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS distance`,
        )
        .where(
          `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
          { distance: distance },
        )
        //.andWhere('user.is_verified = true')
        .andWhere('user.id = :id', { id: id })
        .getMany()
    );
  }

  //HERE
  async nearbyActivitiesByUsersPreferedActivity(
    lat: number,
    lng: number,
    distance: number,
    id: string,
  ) {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .select('users.id, users.badge_id')
      .where("users.id = '" + id + "'")
      .getRawOne();
    return this.destinationRepo
      .createQueryBuilder('destination')
      .leftJoinAndMapOne(
        'destination.activity',
        ActivityPackage,
        'activity',
        'activity.id = destination.activity_package_id',
      )
      .leftJoinAndMapOne(
        'activity.badge',
        Badge,
        'badge',
        'badge.id = activity.main_badge_id',
      )
      .select(['destination', 'badge'])
      .addSelect(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS destination_distance`,
      )
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      .andWhere("badge.id = '" + user.badge_id + "'")
      .orderBy('destination_distance')
      .getRawMany();
  }

  async nearbyDestinationsByUsersPreferedActivity(
    lat: number,
    lng: number,
    distance: number,
    id: string,
  ) {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .select('users.id, users.badge_id')
      .where("users.id = '" + id + "'")
      .getRawOne();
    return this.activityRepo
      .createQueryBuilder('activity')
      .leftJoinAndMapOne(
        'activity.badge',
        Badge,
        'badge',
        'badge.id = activity.main_badge_id',
      )
      .leftJoinAndMapMany(
        'activity.destination',
        ActivityPackageDestination,
        'destination',
        'activity.id = destination.activity_package_id',
      )
      .leftJoinAndMapMany(
        'destination.destinationImage',
        ActivityPackageDestinationImage,
        'destinationImage',
        'destination.id = destinationImage.activity_package_destination_id',
      )
      .leftJoinAndMapOne(
        'activity.user',
        User,
        'user',
        'user.id = activity.user_id',
      )
      .select([
        'activity',
        'destination',
        'destinationImage',
        'user.first_name',
        'user.last_name',
        'user.phone_no',
        'user.email',
      ])
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      .andWhere("badge.id = '" + user.badge_id + "'")
      .getMany();
  }

  async nearbyPopularGuidesByUsersPreferedActivity(
    lat: number,
    lng: number,
    distance: number,
    id: string,
  ) {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .select('users.id, users.badge_id')
      .where("users.id = '" + id + "'")
      .getRawOne();
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndMapMany(
        'user.activity',
        ActivityPackage,
        'activity',
        'user.id = activity.user_id',
      )
      .leftJoinAndMapMany(
        'activity.badge',
        Badge,
        'badge',
        'badge.id = activity.main_badge_id',
      )
      .leftJoinAndMapMany(
        'activity.destination',
        ActivityPackageDestination,
        'destination',
        'activity.id = destination.activity_package_id',
      )
      .select(['user', 'activity', 'badge'])
      .addSelect((reviewsCount) => {
        return reviewsCount
          .select('CAST(COUNT(review.id) AS INTEGER)', 'count')
          .from(UserReview, 'review')
          .where('review.guide_user_id = user.id')
          .limit(1);
      }, 'reviews')
      .addSelect(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) AS distance`,
      )
      .where(
        `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( destination.latitude ) ) * cos( radians( destination.longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( destination.latitude ) ) ) ) < :distance`,
        { distance: distance },
      )
      .andWhere("badge.id = '" + user.badge_id + "'")
      .orderBy('reviews', 'DESC')
      .addOrderBy('distance', 'ASC')
      .getRawMany();
  }
}
