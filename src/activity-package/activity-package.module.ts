import { Module } from '@nestjs/common';
import { ActivityPackageController } from './activity-package.controller';
import { ActivityPackageService } from './activity-package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackage } from './activity-package.entity';

@Module({
  controllers: [ActivityPackageController],
  providers: [ActivityPackageService],
  imports: [TypeOrmModule.forFeature([ActivityPackage])],
  exports: [ActivityPackageService],
})
export class ActivityPackageModule {}
