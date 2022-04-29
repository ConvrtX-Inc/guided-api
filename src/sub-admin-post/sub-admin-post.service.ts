import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityArticleImage } from 'src/activity-article-image/activity-article-image.entity';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { getConnection, Repository } from 'typeorm';

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
      .andWhere('activity.category_type in (4,2)') //filter article and newsfeed
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
      .andWhere('activity.category_type in (4,2)') //filter article and newsfeed
      .innerJoin(
        'badge',
        'badge',
        'badge.id::text=newsfeed.main_badge_id::text',
      )
      .getRawMany();

    return query_article.concat(query_newsfeed);
  }

  async getPosts() {
    return await getConnection().query(
      'SELECT * FROM activity_post' + ' ORDER BY id ASC',
    );
  }

  async getActivityWithBadge(user_id: string) {
    return await this.repoActivityPost.find({
      select: [
        'id',
        'title',
        'created_date',
        'user_id',
        //'snapshot_img',
        'firebase_snapshot_img',
        'views',
        'category_type',
        'premium_user',
        'post_id',
      ],
      order: { created_date: 'DESC' },
      where: { user_id: user_id },
      relations: ['activityBadge'],
    });
    /*const query = await this.repoActivityPost
      .createQueryBuilder('post')
      .select('post.title,post.snapshot_img,b.img_icon')
      .innerJoin('badge', 'b', 'b.id::text=post.main_badge_id::text')
      .where('post.user_id = :user_id', { user_id: user_id })
      .orderBy('post.created_date', 'DESC')
      .getRawMany();

    return query;*/
  }

  async getRecentPosts(user_id: string) {
    /*return this.repoActivityPost
      .createQueryBuilder()
      .select('title,snapshot_img')
      .where('user_id = :user_id', { user_id: user_id })
      .limit(4)
      .orderBy('created_date', 'DESC')
      .getRawMany();*/
    return await this.repoActivityPost.find({
      select: [
        'id',
        'title',
        'created_date',
        'user_id',
        //'snapshot_img',
        'firebase_snapshot_img',
      ],
      take: 4,
      order: { created_date: 'DESC' },
      where: { user_id: user_id },
      relations: ['activityBadge'],
    });
  }
}
