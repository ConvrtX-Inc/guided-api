import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityEventService } from './activityEvent.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityEvent } from './activityEvent.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Events')
@Crud({
  model: {
    type: ActivityEvent,
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
  path: 'activity-events',
  version: '1',
})
export class ActivityEventController implements CrudController<ActivityEvent> {
  constructor(public service: ActivityEventService) {}

  get base(): CrudController<ActivityEvent> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
