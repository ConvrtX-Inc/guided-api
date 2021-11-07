import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityPackageService } from './activityPackage.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackage } from './activityPackage.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Packages')
@Crud({
  model: {
    type: ActivityPackage,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller({
  path: 'activity-packages',
  version: '1',
})
export class ActivityPackageController
  implements CrudController<ActivityPackage>
{
  constructor(public service: ActivityPackageService) {}

  get base(): CrudController<ActivityPackage> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
