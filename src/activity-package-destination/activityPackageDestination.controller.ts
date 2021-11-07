import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityPackageDestinationService } from './activityPackageDestination.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackageDestination } from './activityPackageDestination.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activities Package Destinations')
@Crud({
  model: {
    type: ActivityPackageDestination,
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
  path: 'activity-package-destinations',
  version: '1',
})
export class ActivityPackageDestinationController
  implements CrudController<ActivityPackageDestination>
{
  constructor(public service: ActivityPackageDestinationService) {}

  get base(): CrudController<ActivityPackageDestination> {
    return this;
  }

  @Override()
  async createOneBase(@Request() request) {
    return this.service.saveEntity(request);
  }
  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
