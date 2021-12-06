import { Controller, Request, UseGuards, Post, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityOutfitterService } from './activityOutfitter.service';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Outfitter')
@Crud({
  model: {
    type: ActivityOutfitter,
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
  path: 'activity-outfitter',
  version: '1',
})
export class ActivityOutfitterController implements CrudController<ActivityOutfitter> {
  constructor(readonly service: ActivityOutfitterService) {}

  get base(): CrudController<ActivityOutfitter> {
    return this;
  }

  @ApiOperation({ summary: 'Approved an activity outfitter.' })
  @Post('approved-activity-outfitter/:id')
  @HttpCode(HttpStatus.OK)
  public async approvedActivityOutfitter(@Param('id') id: string) {
    return this.service.approvedActivityOutfitter(id);
  }

  @ApiOperation({ summary: 'Reject an activity outfitter.' })
  @Post('reject-activity-outfitter/:id')
  @HttpCode(HttpStatus.OK)
  public async rejectActivityOutfitter(@Param('id') id: string) {
    return this.service.rejectActivityOutfitter(id);
  }
}
