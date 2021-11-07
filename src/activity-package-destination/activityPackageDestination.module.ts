import { Module } from '@nestjs/common';
import { ActivityPackageDestinationController } from './activityPackageDestination.controller';
import { ActivityPackageDestinationService } from './activityPackageDestination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageDestination } from './activityPackageDestination.entity';

@Module({
  controllers: [ActivityPackageDestinationController],
  providers: [ActivityPackageDestinationService],
  imports: [TypeOrmModule.forFeature([ActivityPackageDestination])],
})
export class ActivityPackageDestinationModule {}
