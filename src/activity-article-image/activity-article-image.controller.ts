import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ActivityArticleImageService } from './activity-article-image.service';
import { ActivityArticleImage } from './activity-article-image.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Article Image')
@Crud({
  model: {
    type: ActivityArticleImage,
  },
  routes: {
    //exclude: ['replaceOneBase', 'createManyBase'],
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
  path: 'activity-article-image',
  version: '1',
})
export class ActivityArticleImageController
  implements CrudController<ActivityArticleImage>
{
  constructor(public service: ActivityArticleImageService) {}
  get base(): CrudController<ActivityArticleImage> {
    return this;
  }
  @Get('/get-by-article/:article_id')
  @ApiOperation({ summary: 'Get Article Image by Article' })
  getArticleImageByArticleId(@Param('article_id') article_id: string) {
    return this.service.getArticleImageByArticleId(article_id);
  }

}
