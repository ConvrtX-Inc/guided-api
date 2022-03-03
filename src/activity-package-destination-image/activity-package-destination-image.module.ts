import { Module } from '@nestjs/common';
import { ActivityPackageDestinationImageController } from './activity-package-destination-image.controller';
import { ActivityPackageDestinationImageService } from './activity-package-destination-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageDestinationImage } from './activity-package-destination-image.entity';

@Module({
  controllers: [ActivityPackageDestinationImageController],
  providers: [ActivityPackageDestinationImageService],
  imports: [TypeOrmModule.forFeature([ActivityPackageDestinationImage])],
})
export class ActivityPackageDestinationImageModule {}
