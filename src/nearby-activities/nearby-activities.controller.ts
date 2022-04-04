import { Controller, UseGuards, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { NearbyActivitiesService } from './nearby-activities.service';
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Nearby Activities')
@Controller({
  path: 'nearby-activities',
  version: '1',
})
export class NearbyActivitiesController {
  constructor(public service: NearbyActivitiesService) { }

  @ApiOperation({ summary: 'Get nearby destinations' })
  @ApiQuery({ name: 'searchText', required: false })
  @Get('nearby-locations/:latitude/:longitude/:kilometer')
  public async nearbyDestinations(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Query('searchText') searchText?: string) {
    return this.service.nearbyDestinations(latitude, longitude, kilometer, searchText);
  }

  @ApiOperation({ summary: 'Get nearby activities List' })
  @Get('nearby-activities/:latitude/:longitude/:kilometer')
  public async nearbyActivitiesList(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number) {
    return this.service.nearbyActivitiesList(latitude, longitude, kilometer);
  }

  @ApiOperation({ summary: 'Get popular guides near the user' })
  @Get('popular-guides-home/:latitude/:longitude/:kilometer')
  public async nearbyPopularGuidesForHome(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number) {
    return this.service.nearbyPopularGuidesforHome(latitude, longitude, kilometer);
  }

  @ApiOperation({ summary: 'Get popular guides list near the user' })
  @ApiQuery({ name: 'searchText', required: false })
  @Get('popular-guides-list/:latitude/:longitude/:kilometer')
  public async nearbyPopularGuidesList(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Query('searchText') searchText?: string) {
    return this.service.nearbyPopularGuidesList(latitude, longitude, kilometer, searchText);
  }

  @ApiOperation({ summary: 'Get popular guides details near the user' })
  @Get('popular-guides-detail/:latitude/:longitude/:kilometer/:guide_id')
  public async nearbyPopularGuidesDetail(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Param('guide_id') id: string) {
    return this.service.nearbyPopularGuidesDetail(latitude, longitude, kilometer, id);
  }

  //HERE
  @ApiOperation({ summary: 'Get nearby activities based on user\'s prefered activity' })
  @Get('nearby-activities-by-user-prefered-activity/:latitude/:longitude/:kilometer/:user_id')
  public async nearbyActivitiesByUsersPreferedActivity(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Param('user_id') id: string) {
    return this.service.nearbyActivitiesByUsersPreferedActivity(latitude, longitude, kilometer, id);
  }

  @ApiOperation({ summary: 'Get nearby destinations based on user\'s prefered activity' })
  @Get('nearby-destinations-by-user-prefered-activity/:latitude/:longitude/:kilometer/:user_id')
  public async nearbyDestinationsByUsersPreferedActivity(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Param('user_id') id: string) {
    return this.service.nearbyDestinationsByUsersPreferedActivity(latitude, longitude, kilometer, id);
  }

  @ApiOperation({ summary: 'Get nearby popular guides based on user\'s prefered activity' })
  @Get('nearby-popular-guides-by-user-prefered-activity/:latitude/:longitude/:kilometer/:user_id')
  public async nearbyPopularGuidesByUsersPreferedActivity(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('kilometer') kilometer: number, @Param('user_id') id: string) {
    return this.service.nearbyPopularGuidesByUsersPreferedActivity(latitude, longitude, kilometer, id);
  }
}
