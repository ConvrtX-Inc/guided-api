import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityAvailabilityHoursService } from './activityAvailabilityHours.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAvailabilityHours } from './activityAvailabilityHours.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Availability Hours')
@Crud({
  model: {
    type: ActivityAvailabilityHours,
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
  path: 'activity-availability-hours',
  version: '1',
})
export class ActivityAvailabilityHoursController
  implements CrudController<ActivityAvailabilityHours>
{
  constructor(public service: ActivityAvailabilityHoursService) {}

  get base(): CrudController<ActivityAvailabilityHours> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
