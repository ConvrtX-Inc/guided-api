import { Controller, Request, UseGuards, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Notification } from './notification.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Notification')
@Crud({
  model: {
    type: Notification,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
    join:{
      from_user: {
        eager: true,
        allow: ["full_name", "email","profile_photo_firebase_url"]
      }
    }
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
  path: 'notifications',
  version: '1',
})
export class NotificationController implements CrudController<Notification> {
  constructor(public service: NotificationService) {}

  get base(): CrudController<Notification> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }


  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const notifications =  await this.service.getMany(req);
    return this.service.getNotifications(notifications);
  }

  @ApiOperation({ summary: 'Get notifications by user ID' })
  @Get('by_user/:user_id')
  public async getNotificationByUser(@Param('user_id') user_id: string) {
    return this.service.getNotificationByUser(user_id);
  }

  @ApiOperation({ summary: 'Get Traveler booking request notifications' })
  @Get('traveler/:user_id/:filter')
  public async getTravelerNotifications(@Param('user_id') user_id: string,@Param('filter') filter: string) {
    return this.service.getTravelerNotifications(user_id,filter);
  }
}
