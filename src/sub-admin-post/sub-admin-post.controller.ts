import { Controller, Get, UseGuards } from '@nestjs/common';
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

  @Get('/guide-view-post')
  @ApiOperation({ summary: 'Guide / Influencers - View Post' })
  getGuidesViewPost() {
    return this.subadminService.getGuidesViewPost();
  }
}
