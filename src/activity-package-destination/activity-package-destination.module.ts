import { Module } from '@nestjs/common';
import { ActivityPackageDestinationController } from './activity-package-destination.controller';
import { ActivityPackageDestinationService } from './activity-package-destination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageDestination } from './activity-package-destination.entity';

@Module({
  controllers: [ActivityPackageDestinationController],
  providers: [ActivityPackageDestinationService],
  imports: [TypeOrmModule.forFeature([ActivityPackageDestination])],
})
export class ActivityPackageDestinationModule {}
