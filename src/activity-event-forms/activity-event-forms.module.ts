import { Module } from '@nestjs/common';
import { ActivityPackageFormsController } from './activity-package-forms.controller';
import { ActivityPackageFormsService } from './activity-package-forms.service';

@Module({
  controllers: [ActivityPackageFormsController],
  providers: [ActivityPackageFormsService]
})
export class ActivityEventFormsModule {}
