import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NearbyActivitiesController } from './nearby-activities.controller';
import { NearbyActivitiesService } from './nearby-activities.service';
import { ActivityPackageDestination } from '../activity-package-destination/activity-package-destination.entity';
import { ActivityPackage } from '../activity-package/activity-package.entity';
import { ActivityPackageDestinationImage } from '../activity-package-destination-image/activity-package-destination-image.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [NearbyActivitiesController],
  providers: [NearbyActivitiesService],
  imports: [
    TypeOrmModule.forFeature([
      ActivityPackage,
      ActivityPackageDestination,
      ActivityPackageDestinationImage,
      User,
    ]),
  ],
  exports: [NearbyActivitiesService],
})
export class NearbyActivitiesModule {}
