import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ActivityEventForms } from './activity-event-forms.entity';
import { ActivityEventFormsService } from './activity-event-forms.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Event Forms')
@Crud({
  model: {
    type: ActivityEventForms,
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
  path: 'activity-event-forms',
  version: '1',
})
export class ActivityEventFormsController
  implements CrudController<ActivityEventForms>
{
  constructor(public service: ActivityEventFormsService) {}
  get base(): CrudController<ActivityEventForms> {
    return this;
  }
}
