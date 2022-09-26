import {
  Controller,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Message')
@Crud({
  model: {
    type: Message,
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
  path: 'message',
  version: '1',
})
export class MessageController implements CrudController<Message> {
  constructor(public service: MessageService) {}

  get base(): CrudController<Message> {
    return this;
  }

  @ApiOperation({
    summary:
      'Get the messages of a user (Param: all, unread, spam, sent, archive)',
  })
  @Get('/:user_id/:filter')
  @HttpCode(HttpStatus.OK)
  async filterMessages(
    @Param('user_id') user_id: string,
    @Param('filter') filter: string,
  ) {
    return this.service.filterMessages(user_id, filter);
  }
}
