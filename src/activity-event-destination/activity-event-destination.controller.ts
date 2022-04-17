import { Controller, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityEventDestination } from './activity-event-destination.entity';
import { ActivityEventDestinationService } from './activity-event-destination.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Event Destination')
@Crud({
  model: {
    type: ActivityEventDestination,
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
  path: 'activity-event-destination',
  version: '1',
})
export class ActivityEventDestinationController
  implements CrudController<ActivityEventDestination>
{
  constructor(public service: ActivityEventDestinationService) {}
  get base(): CrudController<ActivityEventDestination> {
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
