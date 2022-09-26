import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';

import { UserMessagesBlockService } from './user-messages-block.service';
import { UserBlockMessages } from './user-message-block.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Messages Block')
@Crud({
  model: {
    type: UserBlockMessages,
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
  path: 'user-messages-block',
  version: '1',
})
export class UserMessagesBlockController
  implements CrudController<UserBlockMessages>
{
  constructor(public service: UserMessagesBlockService) {}

  get base(): CrudController<UserBlockMessages> {
    return this;
  }
}
