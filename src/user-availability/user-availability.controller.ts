import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { UserAvailability } from './user-availability.entity';
import { UserAvailabilityService } from './user-availability.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users Availability')
@Crud({
  model: {
    type: UserAvailability,
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
  path: 'user-availability',
  version: '1'
})
export class UserAvailabilityController implements CrudController<UserAvailability> {
  constructor(public service: UserAvailabilityService) { }

  get base(): CrudController<UserAvailability> {
    return this;
  }
}