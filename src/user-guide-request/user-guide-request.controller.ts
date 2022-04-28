import {
  Controller,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { UserGuideRequest } from './user-guide-request.entity';
import { UserGuideRequestService } from './user-guide-request.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users Guide Request')
@Crud({
  model: {
    type: UserGuideRequest,
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
  path: 'user-guide-request',
  version: '1'
})
export class UserGuideRequestController implements CrudController<UserGuideRequest> {
  constructor(public service: UserGuideRequestService) { }

  get base(): CrudController<UserGuideRequest> {
    return this;
  }
}

