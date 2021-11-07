import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityAvailabilityService } from './activityAvailability.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAvailability } from './activityAvailability.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Availabilities')
@Crud({
  model: {
    type: ActivityAvailability,
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
  path: 'activity-availabilities',
  version: '1',
})
export class ActivityAvailabilityController
  implements CrudController<ActivityAvailability>
{
  constructor(public service: ActivityAvailabilityService) {}

  get base(): CrudController<ActivityAvailability> {
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
