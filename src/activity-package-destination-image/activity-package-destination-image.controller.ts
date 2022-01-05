import { Controller, Request, UseGuards } from '@nestjs/common';
import { ActivityPackageDestinationImageService } from './activity-package-destination-image.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackageDestinationImage } from './activity-package-destination-image.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Package Destination Images')
@Crud({
  model: {
    type: ActivityPackageDestinationImage,
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
  path: 'activity-package-destination-images',
  version: '1',
})
export class ActivityPackageDestinationImageController
  implements CrudController<ActivityPackageDestinationImage>
{
  constructor(public service: ActivityPackageDestinationImageService) {}

  get base(): CrudController<ActivityPackageDestinationImage> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
