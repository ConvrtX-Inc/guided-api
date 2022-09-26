import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityPostCategoryService } from './activity-post-category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPostCategory } from './activity-post-category.entity';

@ApiTags('Activity Post Category')
@Crud({
  model: {
    type: ActivityPostCategory,
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
  path: 'activity-post-category',
  version: '1',
})
export class ActivityPostCategoryController
  implements CrudController<ActivityPostCategory>
{
  constructor(public service: ActivityPostCategoryService) {}

  get base(): CrudController<ActivityPostCategory> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
