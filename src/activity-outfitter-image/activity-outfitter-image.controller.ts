import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ActivityOutfitterImage } from './entities/activity-outfitter-image.entity';
import { ActivityOutfitterImageService } from './activity-outfitter-image.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Outfitter Image')
@Crud({
  model: {
    type: ActivityOutfitterImage,
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
})
@Controller({
  path: 'activity-outfitter-image',
  version: '1',
})
export class ActivityOutfitterImageController implements CrudController<ActivityOutfitterImage>{
  constructor(readonly service: ActivityOutfitterImageService) {}

  get base(): CrudController<ActivityOutfitterImage> {
    return this;
  }
}
