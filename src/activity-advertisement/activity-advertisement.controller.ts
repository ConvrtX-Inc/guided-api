import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAdvertisementService } from './activity-advertisement.service';
import { AdvertisementUserAndStatusDto } from './dtos/advertisement-user-status.dto';
import { ActivityAdvertisement } from './entities/activity-advertisement.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Advertisement')
@Crud({
  model: {
    type: ActivityAdvertisement,
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
  path: 'activity-advertisement',
  version: '1',
})
export class ActivityAdvertisementController
  implements CrudController<ActivityAdvertisement>
{
  constructor(readonly service: ActivityAdvertisementService) {}

  get base(): CrudController<ActivityAdvertisement> {
    return this;
  }

  @ApiOperation({ summary: 'Approved an advertisement.' })
  @Post('approved-activity-advertisement/:id')
  @HttpCode(HttpStatus.OK)
  public async approvedActivityAdvertisement(@Param('id') id: string) {
    return this.service.approvedActivityAdvertisement(id);
  }

  @ApiOperation({ summary: 'Reject an advertisement.' })
  @Post('reject-activity-advertisement/:id')
  @HttpCode(HttpStatus.OK)
  public async rejectActivityAdvertisement(@Param('id') id: string) {
    return this.service.rejectActivityAdvertisement(id);
  }

  @ApiOperation({
    summary: 'Get the advertisement posts by user_id and status',
  })
  @Get('byuser/post/:user_id/:status')
  public async getAdvertisementsByUserAndStatus(
    @Param('user_id') user_id: string,
    @Param('status') status: string,
  ) {
    return this.service.getadvertisementsByUserAndStatus(user_id, status);
  }
}
