import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
