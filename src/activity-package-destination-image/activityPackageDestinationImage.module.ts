import { Module } from '@nestjs/common';
import { ActivityPackageDestinationImageController } from './activityPackageDestinationImage.controller';
import { ActivityPackageDestinationImageService } from './activityPackageDestinationImage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageDestinationImage } from './activityPackageDestinationImage.entity';

@Module({
  controllers: [ActivityPackageDestinationImageController],
  providers: [ActivityPackageDestinationImageService],
  imports: [TypeOrmModule.forFeature([ActivityPackageDestinationImage])],
})
export class ActivityPackageDestinationImageModule {}
