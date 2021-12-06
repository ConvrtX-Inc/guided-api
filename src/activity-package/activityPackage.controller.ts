import { Controller, Request, UseGuards, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ActivityPackageService } from './activityPackage.service';
import { ApiBearerAuth, ApiTags, ApiOperation} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityPackage } from './activityPackage.entity';

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

}
