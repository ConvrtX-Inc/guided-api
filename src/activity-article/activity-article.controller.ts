import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';

import { ActivityArticle } from './activity-article.entity';
import { ActivityArticleService } from './activity-article.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Article')
@Crud({
  model: {
    type: ActivityArticle,
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
  path: 'activity-article',
  version: '1',
})
export class ActivityArticleController
  implements CrudController<ActivityArticle>
{
  constructor(public service: ActivityArticleService) {}

  get base(): CrudController<ActivityArticle> {
    return this;
  }

  @ApiOperation({ summary: 'Approved an article.' })
  @Post('approved-article/:id')
  @HttpCode(HttpStatus.OK)
  public async approvedArticle(@Param('id') id: string) {
    return this.service.approvedArticle(id);
  }

  @ApiOperation({ summary: 'Reject an article.' })
  @Post('reject-article/:id')
  @HttpCode(HttpStatus.OK)
  public async rejectArticle(@Param('id') id: string) {
    return this.service.rejectArticle(id);
  }
}
