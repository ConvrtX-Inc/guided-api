import {
  Controller,
  Request,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import { ActivityEventService } from './activity-event.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityEvent } from './activity-event.entity';
import { EventUserAndStatusDto } from './dtos/event-user-status.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Events')
@Crud({
  model: {
    type: ActivityEvent,
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
  path: 'activity-events',
  version: '1',
})
export class ActivityEventController implements CrudController<ActivityEvent> {
  constructor(public service: ActivityEventService) {}

  get base(): CrudController<ActivityEvent> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @ApiOperation({ summary: 'Approved an event.' })
  @Post('approved-event/:id')
  @HttpCode(HttpStatus.OK)
  public async approvedEvent(@Param('id') id: string) {
    return this.service.approvedEvent(id);
  }

  @ApiOperation({ summary: 'Reject an event.' })
  @Post('reject-event/:id')
  @HttpCode(HttpStatus.OK)
  public async rejectEvent(@Param('id') id: string) {
    return this.service.rejectEvent(id);
  }

  @ApiOperation({ summary: 'Get activity events by user_id and status' })
  @Post('byuser/post')
  public async getEventsByUserAndStatus(
    @Body() eventUserAndStatusDto: EventUserAndStatusDto,
  ) {
    return this.service.getEventsByUserAndStatus(eventUserAndStatusDto);
  }
}
