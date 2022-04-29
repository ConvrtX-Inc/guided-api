import { Controller, UseGuards, Get, HttpCode, HttpStatus, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { MessageDetailService } from './message-detail.service';
import { MessageDetail } from './message-detail.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Message Detail')
@Crud({
  model: {
    type: MessageDetail,
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
  path: 'message-detail',
  version: '1',
})
export class MessageDetailController implements CrudController<MessageDetail> {
  constructor(public service: MessageDetailService) {}

  get base(): CrudController<MessageDetail> {
    return this;
  }

  @ApiOperation({ summary: 'Get the messages of a user (Param: all, unread, spam, sent, archive)' })
  @Get('/:user_id/:filter')
  @HttpCode(HttpStatus.OK)
  async filterMessages(@Param('user_id') user_id: string, @Param('filter') filter: string) {
    return this.service.filterMessages(user_id, filter);
  }

  @ApiOperation({ summary: 'Delete Messages' })
  @Delete('/delete-conversation/:room_id/user/:user_id')
  @HttpCode(HttpStatus.OK)
  async deleteMessages(@Param('room_id') room_id: string,@Param('user_id') user_id: string) {
    return this.service.deleteMessages(room_id,user_id);
  }
}

