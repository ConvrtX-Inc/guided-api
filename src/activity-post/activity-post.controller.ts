import {
  Controller,  
  UseGuards,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Get
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
  
import { ActivityPost } from './activity-post.entity';
import { ActivityPostService } from './activity-post.service';
  
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

  @ApiOperation({ summary: 'Approved a post, post_id is dependent on the category of post.' })
  @Post('approved-post/:post_id')
  @HttpCode(HttpStatus.OK)
  public async approvedPost(@Param('post_id') post_id: string) {
    return this.service.approvedPost(post_id);
  }

  @ApiOperation({ summary: 'Reject a post, post_id is dependent on the category of post.' })
  @Post('reject-post/:post_id')
  @HttpCode(HttpStatus.OK)
  public async rejectPost(@Param('post_id') post_id: string) {
    return this.service.rejectPost(post_id);
  }
}
  