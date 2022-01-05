import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ActivityAdvertisementImageService } from './activity-advertisement-image.service';
import { ActivityAdvertisementImage } from './entities/activity-advertisement-image.entity';


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Advertisement Image')
@Crud({
  model: {
    type: ActivityAdvertisementImage,
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
})
@Controller({
  path: 'activity-advertisement-image',
  version: '1',
})
export class ActivityAdvertisementImageController  implements CrudController<ActivityAdvertisementImage> {
  constructor(readonly service: ActivityAdvertisementImageService) {}

  get base(): CrudController<ActivityAdvertisementImage> {
    return this;
  }
}
