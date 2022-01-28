import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityPackageFormsService } from './activity-package-forms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackageForms } from './activity-package-forms.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Package Forms')
@Crud({
  model: {
    type: ActivityPackageForms,
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
  path: 'activity-package-forms',
  version: '1',
})
export class ActivityPackageFormsController
  implements CrudController<ActivityPackageForms>
{
  constructor(public service: ActivityPackageFormsService) {}

  get base(): CrudController<ActivityPackageForms> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
