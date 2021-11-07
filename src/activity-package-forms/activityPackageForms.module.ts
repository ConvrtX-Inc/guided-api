import { Module } from '@nestjs/common';
import { ActivityPackageFormsController } from './activityPackageForms.controller';
import { ActivityPackageFormsService } from './activityPackageForms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageForms } from './activityPackageForms.entity';

@Module({
  controllers: [ActivityPackageFormsController],
  providers: [ActivityPackageFormsService],
  imports: [TypeOrmModule.forFeature([ActivityPackageForms])],
})
export class ActivityPackageFormsModule {}
