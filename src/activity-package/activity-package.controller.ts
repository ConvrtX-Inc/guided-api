import {
  Controller,
  Request,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ActivityPackageService } from './activity-package.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackage } from './activity-package.entity';
import { UserProfileQuestionDto } from '../user-profile-question/dtos/user-profile-question.dto';
import { ClosestActivityDto } from './dtos/activity-package.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Packages')
@Crud({
  model: {
    type: ActivityPackage,
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
  path: 'activity-packages',
  version: '1',
})
export class ActivityPackageController
  implements CrudController<ActivityPackage>
{
  constructor(public service: ActivityPackageService) {}

  get base(): CrudController<ActivityPackage> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @ApiOperation({ summary: 'Get the activity packages of a user' })
  @Get('byuser/:user_id')
  public async getActivityPackageByUser(@Param('user_id') user_id: string) {
    return this.service.getActivityPackageByUser(user_id);
  }

  @ApiOperation({ summary: 'Approved an activity package.' })
  @Post('approved-activity-package/:id')
  @HttpCode(HttpStatus.OK)
  public async approvedActivityPackage(@Param('id') id: string) {
    return this.service.approvedActivityPackage(id);
  }

  @ApiOperation({ summary: 'Reject an activity package.' })
  @Post('reject-activity-package/:id')
  @HttpCode(HttpStatus.OK)
  public async rejectActivityPackage(@Param('id') id: string) {
    return this.service.rejectActivityPackage(id);
  }

  @ApiOperation({
    summary: 'Search activity packages (name, description, and address)',
  })
  @Get('search/:searchText')
  public async getActivityPackageBySearchText(
    @Param('searchText') text: string,
  ) {
    return this.service.getActivityPackageBySearchText(text);
  }

  @ApiOperation({ summary: 'Check activity availability by activity ID' })
  @Get('availability/:id')
  public async checkActivityAvailability(@Param('id') id: string) {
    return this.service.checkActivityAvailability(id);
  }

  @ApiOperation({ summary: 'get closest activity' })
  @Post('closest-activity')
  @HttpCode(HttpStatus.OK)
  public async getClosestActivity(@Body() dto: ClosestActivityDto) {
    return this.service.getClosestActivity(dto);
  }
}
