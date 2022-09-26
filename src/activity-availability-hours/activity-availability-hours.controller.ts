import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ActivityAvailabilityHoursService } from './activity-availability-hours.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAvailabilityHours } from './activity-availability-hours.entity';

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

  @Get('/date-range/:activity_package_id/:start_date/:end_date')
  @ApiOperation({
    summary: 'Retrieve activity availability hours by date range',
  })
  getActivityAvailabilityHours(
    @Param('activity_package_id') activity_package_id: string,
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string,
  ) {
    return this.service.getActivityAvailabilityHours(
      activity_package_id,
      start_date,
      end_date,
    );
  }
}
