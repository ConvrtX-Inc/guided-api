import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityArticleImage } from 'src/activity-article-image/activity-article-image.entity';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubAdminPostService {
  constructor(
    @InjectRepository(ActivityPost)
    private repoActivityPost: Repository<ActivityPost>,

    @InjectRepository(ActivityArticle)
    private repoActivityArticle: Repository<ActivityArticle>,

    @InjectRepository(ActivityArticleImage)
    private repoActivityArticleImage: Repository<ActivityArticleImage>,
  ) {}

  async getGuidesViewPost() {
    const query_article = await this.repoActivityPost
      .createQueryBuilder('activity')
      .select(
        'activity.category_type,activity.views,activity.title,activity.created_date, article.premium_user, badge.badge_name,badge.img_icon,articleimage.snapshot_img',
      )
      .innerJoin(
        'activity_article',
        'article',
        'article.id::text = activity.post_id::text',
      )
      .innerJoin('badge', 'badge', 'badge.id::text=article.main_badge_id::text')
      .innerJoin(
        'activity_article_image',
        'articleimage',
        'articleimage.activity_article_id::text=article.id::text',
      )
      .where('articleimage.default_img = true')
      .getRawMany();

    const query_newsfeed = await this.repoActivityPost
      .createQueryBuilder('activity')
      .select(
        'activity.category_type,activity.views,activity.title,activity.created_date, newsfeed.premium_user, badge.badge_name,badge.img_icon,newsfeedimage.snapshot_img',
      )
      .innerJoin(
        'activity_newsfeed',
        'newsfeed',
        'newsfeed.id::text = activity.post_id::text',
      )
      .innerJoin(
        'activity_news_feed_image',
        'newsfeedimage',
        'newsfeedimage.activity_newsfeed_id::text=newsfeed.id::text',
      )
      .where('newsfeedimage.default_img = true')
      .innerJoin(
        'badge',
        'badge',
        'badge.id::text=newsfeed.main_badge_id::text',
      )
      .getRawMany();

    return query_article.concat(query_newsfeed);
  }
}
