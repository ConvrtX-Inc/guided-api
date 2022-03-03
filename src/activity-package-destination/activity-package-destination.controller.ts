import { Controller, Request, UseGuards, Get, Param } from '@nestjs/common';
import { ActivityPackageDestinationService } from './activity-package-destination.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackageDestination } from './activity-package-destination.entity';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
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
