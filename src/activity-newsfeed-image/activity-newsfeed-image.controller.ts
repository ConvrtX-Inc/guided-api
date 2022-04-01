import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ActivityNewsFeedImage } from './activity-newsfeed-image.entity';
import { ActivityNewsfeedImageService } from './activity-newsfeed-image.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Newsfeed Image')
@Crud({
  model: {
    type: ActivityNewsFeedImage,
  },
  routes: {
    //exclude: ['replaceOneBase', 'createManyBase'],
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
  path: 'activity-newsfeed-image',
  version: '1',
})
export class ActivityNewsfeedImageController
  implements CrudController<ActivityNewsFeedImage>
{
  constructor(public service: ActivityNewsfeedImageService) {}
  get base(): CrudController<ActivityNewsFeedImage> {
    return this;
  }
}
