import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubAdminPostService } from './sub-admin-post.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Sub-Admin Post')
@Controller({
  path: 'sub-admin-post',
  version: '1',
})
export class SubAdminPostController {
  constructor(private subadminService: SubAdminPostService) {}

  @Get('/activity-post/:user_id')
  @ApiOperation({ summary: 'Get Activity Post' })
  getActivityWithBadge(@Param('user_id') user_id: string) {
    //return this.subadminService.getGuidesViewPost();
    return this.subadminService.getActivityWithBadge(user_id);
  }
  @Get('/activity-recent-post/:user_id')
  @ApiOperation({ summary: 'Get Recent Posts' })
  getRecentPosts(@Param('user_id') user_id: string) {
    return this.subadminService.getRecentPosts(user_id);
  }

  /*@Get('/guide-view-post')
  @ApiOperation({ summary: 'Guide / Influencers - View Post' })
  getGuidesViewPost() {
    //return this.subadminService.getGuidesViewPost();
    return this.subadminService.getPosts();
  }*/

  @Get('sub-admin-users')
  @ApiOperation({ summary: 'Get Subadmin Users Pagination Enabled' })
  public async getSubAdminUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.subadminService.getSubAdminUsers({ page, limit });
  }
}
