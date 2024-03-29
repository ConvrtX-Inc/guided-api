import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityArticleImage } from './activity-article-image.entity';

@Injectable()
export class ActivityArticleImageService extends TypeOrmCrudService<ActivityArticleImage> {
  constructor(
    @InjectRepository(ActivityArticleImage)
    private articleImageRepo: Repository<ActivityArticleImage>,
  ) {
    super(articleImageRepo);
  }

  async getArticleImageByArticleId(article_id: string) {
    return await this.articleImageRepo.find({
      select: [
        'id',
        'activity_article_id',
        'firebase_snapshot_img',
        'filename',
      ],
      where: { activity_article_id: article_id },
    });
  }
}
