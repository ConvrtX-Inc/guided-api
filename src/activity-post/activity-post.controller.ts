import {
  Controller,
  UseGuards,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';

import { ActivityPost } from './activity-post.entity';
import { ActivityPostService } from './activity-post.service';
import { getRepository } from 'typeorm';
import { Badge } from 'src/badge/badge.entity';
import { Request } from 'express';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Post')
@Crud({
  model: {
    type: ActivityPost,
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
  path: 'activity-post',
  version: '1',
})
export class ActivityPostController implements CrudController<ActivityPost> {
  constructor(public service: ActivityPostService) {}

  get base(): CrudController<ActivityPost> {
    return this;
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const activityPost = await this.service.getMany(req);
    if (activityPost instanceof Array) {
      for (const i in activityPost) {
        const badge = await getRepository(Badge)
          .createQueryBuilder('badge')
          .where({ id: activityPost[i].main_badge_id })
          .getOne();
        activityPost[i]['activityBadge'] = badge;
      }
    }

    return activityPost;
  }

  @ApiOperation({
    summary: 'Approved a post, post_id is dependent on the category of post.',
  })
  @Post('approved-post/:post_id')
  @HttpCode(HttpStatus.OK)
  public async approvedPost(@Param('post_id') post_id: string) {
    return this.service.approvedPost(post_id);
  }

  @ApiOperation({
    summary: 'Reject a post, post_id is dependent on the category of post.',
  })
  @Post('reject-post/:post_id')
  @HttpCode(HttpStatus.OK)
  public async rejectPost(@Param('post_id') post_id: string) {
    return this.service.rejectPost(post_id);
  }

  @ApiOperation({ summary: 'Get posts by user id.' })
  @Post('get-posts/:user_id')
  @HttpCode(HttpStatus.OK)
  public async getPosts(@Param('user_id') user_id: string) {
    return this.service.getPosts(user_id);
  }

  @Get('get-by-post/:post_id')
  @ApiOperation({ summary: 'Get One Activity Post by Post ID' })
  public async getP(@Param('post_id') post_id: string) {
    return this.service.getActivityPostByPostId(post_id);
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get Activity Post Pagination Enabled' })
  @ApiQuery({ name: 'user_id', required: false, type: String })
  @ApiQuery({ name: 'badge_id', required: false, type: String })
  @ApiQuery({ name: 'title', required: false, type: String })
  public async getActivityPostPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('user_id') user_id?: string,
    @Query('badge_id') badge_id?: string,
    @Query('title') title?: string,
  ) {
    return await this.service.getActivityPostPagination(
      user_id,
      badge_id,
      title,
      {
        page,
        limit,
      },
    );
  }
}
