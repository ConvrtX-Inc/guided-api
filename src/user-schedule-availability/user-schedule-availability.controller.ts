import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';

import { UserScheduleAvailabilityService } from './user-schedule-availability.service';
import { UserScheduleAvailability } from './user-schedule-availability.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Schedule Availability')
@Crud({
  model: {
    type: UserScheduleAvailability,
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
  path: 'user-schedule-availability',
  version: '1',
})
export class UserScheduleAvailabilityController
  implements CrudController<UserScheduleAvailability>
{
  constructor(public service: UserScheduleAvailabilityService) {}

  get base(): CrudController<UserScheduleAvailability> {
    return this;
  }
}
