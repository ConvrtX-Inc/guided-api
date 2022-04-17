import { Controller, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityEventDestinationImage } from './activity-event-destination-image.entity';
import { ActivityEventDestinationImageService } from './activity-event-destination-image.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Event Destination Images')
@Crud({
  model: {
    type: ActivityEventDestinationImage,
  },
  routes: {
    exclude: ['replaceOneBase'],
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
  path: 'activity-event-destination-image',
  version: '1',
})
export class ActivityEventDestinationImageController
  implements CrudController<ActivityEventDestinationImage>
{
  constructor(public service: ActivityEventDestinationImageService) {}

  get base(): CrudController<ActivityEventDestinationImage> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
