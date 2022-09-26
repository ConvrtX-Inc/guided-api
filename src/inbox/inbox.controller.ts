import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InboxService } from './inbox.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { Messages } from 'src/messages/messages.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Inbox')
@Controller({
  path: 'inbox',
  version: '1',
})
export class InboxController implements CrudController<Messages> {
  constructor(public service: InboxService) {}

  @ApiOperation({ summary: 'Get Messages list by user id' })
  @Post('get-messages/:user_id')
  @HttpCode(HttpStatus.OK)
  public async getMessagesList(@Param('user_id') user_id: string) {
    return this.service.getMessagesList(user_id);
  }

  @ApiOperation({ summary: 'Delete messages by user id' })
  @Delete('delete-message/:user_id')
  @HttpCode(HttpStatus.OK)
  public async messageDelete(@Param('user_id') sender_id: string) {
    return this.service.messageDelete(sender_id);
  }
}
