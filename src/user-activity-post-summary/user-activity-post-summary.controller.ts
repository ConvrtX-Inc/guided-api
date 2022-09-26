import { Controller, Request, UseGuards } from '@nestjs/common';
import { UserActivityPostSummaryService } from './user-activity-post-summary.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { UserActivityPostSummary } from './user-activity-post-summary.entity';

@ApiBearerAuth()
@ApiTags('User Activity Post Summary')
@Crud({
  model: {
    type: UserActivityPostSummary,
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
  path: 'user-activity-post-summary',
  version: '1',
})
export class UserActivityPostSummaryController
  implements CrudController<UserActivityPostSummary>
{
  constructor(public service: UserActivityPostSummaryService) {}

  get base(): CrudController<UserActivityPostSummary> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
