import { Module } from '@nestjs/common';
import { ActivityPackageController } from './activityPackage.controller';
import { ActivityPackageService } from './activityPackage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackage } from './activityPackage.entity';

@Module({
  controllers: [ActivityPackageController],
  providers: [ActivityPackageService],
  imports: [TypeOrmModule.forFeature([ActivityPackage])],
})
export class ActivityPackageModule {}
