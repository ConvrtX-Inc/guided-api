import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  CrudService,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
import { ActivityEventImageService } from './activity-event-image.service';
import { ActivityEventImage } from './entities/activity-event-image.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Event Image')
@Crud({
  model: {
    type: ActivityEventImage,
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
  path: 'activity-event-image',
  version: '1',
})
export class ActivityEventImageController
  implements CrudController<ActivityEventImage>
{
  constructor(readonly service: ActivityEventImageService) {}

  get base(): CrudController<ActivityEventImage> {
    return this;
  }
}
