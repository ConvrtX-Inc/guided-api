import {
    Controller,  
    UseGuards,
    Post,
    Get,
    HttpCode,
    HttpStatus,
    Param
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
  import { AuthGuard } from '@nestjs/passport';
  import { Crud, CrudController } from '@nestjsx/crud';
    
  import { ActivityNewsfeed } from './activity-newsfeed.entity';
  import { ActivityNewsfeedService } from './activity-newsfeed.service';
    
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Activity Newsfeed')
  @Crud({
    model: {
      type: ActivityNewsfeed,
    },
    routes: {
      exclude: ['getManyBase', 'replaceOneBase', 'createManyBase'],
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
    path: 'activity-newsfeed',
    version: '1',
  })
  export class ActivityNewsfeedController implements CrudController<ActivityNewsfeed> {
    constructor(public service: ActivityNewsfeedService) {}
    
    get base(): CrudController<ActivityNewsfeed> {
      return this;
    }

    @ApiOperation({ summary: 'Approved a newsfeed.' })
    @Post('approved-newsfeed/:id')
    @HttpCode(HttpStatus.OK)
    public async approvedNewsfeed(@Param('id') id: string) {
      return this.service.approvedNewsfeed(id);
    }

    @ApiOperation({ summary: 'Reject a newsfeed.' })
    @Post('reject-newsfeed/:id')
    @HttpCode(HttpStatus.OK)
    public async rejectNewsfeed(@Param('id') id: string) {
      return this.service.rejectNewsfeed(id);
    }

    @ApiOperation({ summary: 'Get Newsfeed list' })
    @Get('list/')
    public async getActivityNewsfeedList() {
      return this.service.getActivityNewsfeedList();
    }
    
    @ApiOperation({ summary: 'Get Newsfeed detail' })
    @Get('detail/:id')
    public async getActivityNewsfeedDetail(@Param('id') id: string) {
      return this.service.getActivityNewsfeedDetail(id);
    }
    
  }
    