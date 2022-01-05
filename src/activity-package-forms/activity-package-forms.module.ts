import { Module } from '@nestjs/common';
import { ActivityPackageFormsController } from './activity-package-forms.controller';
import { ActivityPackageFormsService } from './activity-package-forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPackageForms } from './activity-package-forms.entity';

@Module({
  controllers: [ActivityPackageFormsController],
  providers: [ActivityPackageFormsService],
  imports: [TypeOrmModule.forFeature([ActivityPackageForms])],
})
export class ActivityPackageFormsModule {}
