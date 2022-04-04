import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardRelatedService } from './dashboard-related.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Dashboard Related')
@Controller({
  path: 'dashboard-related',
  version: '1',
})
export class DashboardRelatedController {
  constructor(private dashboardService: DashboardRelatedService) {}

  //count all users --done
  @Get('/all-users')
  @ApiOperation({ summary: 'Count all users' })
  getCountAllUsers() {
    return this.dashboardService.countAllUsers();
  }

  //count active users --done
  @Get('/active-users')
  @ApiOperation({ summary: 'Count active users' })
  getCountActive() {
    return this.dashboardService.countActiveUsers();
  }

  //count online users --done
  @Get('/online-users')
  @ApiOperation({ summary: 'Count online users' })
  getCountOnline() {
    return this.dashboardService.countOnlineUsers();
  }

  //count total downloads
  @Get('/total-downloads')
  @ApiOperation({ summary: 'get total downloads' })
  getTotalDownloads() {
    return this.dashboardService.countTotalDownloads();
  }

  //get recent post --done
  @Get('/recent-post')
  @ApiOperation({ summary: 'Get top 10 recent posts' })
  getRecentPost() {
    return this.dashboardService.recentPosts();
  }

  @Get('/recent-post/:user_id')
  @ApiOperation({ summary: 'Get top 10 recent posts by user id' })
  getRecentPostByUserID(@Param('user_id') user_id: string) {
    return this.dashboardService.recentPostsByUserID(user_id);
  }

  //get recent guides --done
  @Get('/recent-guides')
  @ApiOperation({ summary: 'Get top 10 recent guides' })
  getRecentGuides() {
    return this.dashboardService.recentGuides();
  }

  //get most active users --done
  @Get('/most-active')
  @ApiOperation({ summary: 'Get most active users' })
  getMostActive() {
    return this.dashboardService.mostActiveUsers();
  }

  @Get('/user-activity-post-summary/:user_id')
  @ApiOperation({ summary: 'Get the user activity post summary' })
  getUserActivityPostSummary(@Param('user_id') user_id: string) {
    return this.dashboardService.getUserActivityPostSummary(user_id);
  }

  @Get('/user-recent-post/:user_id')
  @ApiOperation({ summary: 'Get the user activity post summary' })
  getUserRecentPost(@Param('user_id') user_id: string) {
    return this.dashboardService.getUserRecentPost(user_id);
  }
}
