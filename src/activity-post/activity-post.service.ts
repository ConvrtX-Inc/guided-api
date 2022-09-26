import { Injectable } from '@nestjs/common';
import { Connection, createQueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { ActivityPost } from './activity-post.entity';
import { CategoryPost } from './category-post';
import { ActivityPackageService } from '../activity-package/activity-package.service';
import { ActivityNewsfeedService } from '../activity-newsfeed/activity-newsfeed.service';
import { ActivityEventService } from '../activity-event/activity-event.service';
import { ActivityArticleService } from '../activity-article/activity-article.service';
import { ActivityAdvertisementService } from '../activity-advertisement/activity-advertisement.service';
import { ActivityOutfitterService } from '../activity-outfitter/activity-outfitter.service';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityNewsfeed } from 'src/activity-newsfeed/activity-newsfeed.entity';
import { ActivityPackage } from 'src/activity-package/activity-package.entity';
import { ActivityEvent } from 'src/activity-event/activity-event.entity';
import { ActivityAdvertisement } from 'src/activity-advertisement/entities/activity-advertisement.entity';
import { ActivityOutfitter } from 'src/activity-outfitter/entities/activityOutfitter.entity';
import { User } from 'src/users/user.entity';
import { ActivityPackageDestination } from 'src/activity-package-destination/activity-package-destination.entity';
import { ActivityPackageDestinationImage } from 'src/activity-package-destination-image/activity-package-destination-image.entity';
import { ActivityAdvertisementImage } from 'src/activity-advertisement-image/entities/activity-advertisement-image.entity';
import { ActivityEventImage } from 'src/activity-event-image/entities/activity-event-image.entity';
import { ActivityOutfitterImage } from 'src/activity-outfitter-image/entities/activity-outfitter-image.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class ActivityPostService extends TypeOrmCrudService<ActivityPost> {
  constructor(
    @InjectRepository(ActivityPost)
    private activityPostRepository: Repository<ActivityPost>,
    private actPackageService: ActivityPackageService,
    private actNewsfeed: ActivityNewsfeedService,
    private actEvent: ActivityEventService,
    private actArticle: ActivityArticleService,
    private actAdvertisement: ActivityAdvertisementService,
    private actOutfitter: ActivityOutfitterService,
  ) {
    super(activityPostRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPost>) {
    return this.activityPostRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPost>) {
    return this.activityPostRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<ActivityPost>[]) {
    return this.activityPostRepository.save(
      this.activityPostRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.activityPostRepository.softDelete(id);
  }

  async approvedPost(post_id: string) {
    const post = await this.activityPostRepository.findOne({
      where: { post_id: post_id },
    });
    if (post) {
      post.is_published = true;
      let categorypost = post.category_type;
      await post.save();

      switch (categorypost) {
        case CategoryPost.cpActivityPackage: {
          this.actPackageService.approvedActivityPackage(post_id);
          break;
        }
        case CategoryPost.cpAdvertisement: {
          this.actAdvertisement.approvedActivityAdvertisement(post_id);
          break;
        }
        case CategoryPost.cpArticle: {
          this.actArticle.approvedArticle(post_id);
          break;
        }
        case CategoryPost.cpEvent: {
          this.actEvent.approvedEvent(post_id);
          break;
        }
        case CategoryPost.cpNewsFeed: {
          this.actNewsfeed.approvedNewsfeed(post_id);
          break;
        }
        case CategoryPost.cpOutfitter: {
          this.actOutfitter.approvedActivityOutfitter(post_id);
          break;
        }
      }
    }
  }

  async rejectPost(post_id: string) {
    const post = await this.activityPostRepository.findOne({
      where: { post_id: post_id },
    });
    if (post) {
      post.is_published = false;
      let categorypost = post.category_type;
      await post.save();

      switch (categorypost) {
        case CategoryPost.cpActivityPackage: {
          this.actPackageService.rejectActivityPackage(post_id);
          break;
        }
        case CategoryPost.cpAdvertisement: {
          this.actAdvertisement.rejectActivityAdvertisement(post_id);
          break;
        }
        case CategoryPost.cpArticle: {
          this.actArticle.rejectArticle(post_id);
          break;
        }
        case CategoryPost.cpEvent: {
          this.actEvent.rejectEvent(post_id);
          break;
        }
        case CategoryPost.cpNewsFeed: {
          this.actNewsfeed.rejectNewsfeed(post_id);
          break;
        }
        case CategoryPost.cpOutfitter: {
          this.actOutfitter.rejectActivityOutfitter(post_id);
          break;
        }
      }
    }
  }

  async getPosts(user_id: string) {
    let aggregatedPosts: Array<ActivityPost[]> = [];
    const users = await this.activityPostRepository.find({ user_id: user_id });
    for (const user of users) {
      switch (user.category_type) {
        case CategoryPost.cpActivityPackage: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.package',
              ActivityPackage,
              'package',
              'package.user_id::uuid = activity-post.user_id',
            )
            .innerJoinAndMapMany(
              'package.package-destination',
              ActivityPackageDestination,
              'package-destination',
              'package-destination.activity_package_id = package.id',
            )
            .innerJoinAndMapMany(
              'package-destination.package-destination-image',
              ActivityPackageDestinationImage,
              'package-destination-image',
              'package-destination-image.activity_package_destination_id = package-destination.id',
            )
            .select([
              'activity-post',
              'package.id',
              'package.user_id',
              'package.main_badge_id',
              'package.sub_badge_ids',
              'package.package_note',
              'package.name',
              'package.description',
              'package.cover_img',
              'package.max_traveller',
              'package.min_traveller',
              'package.country',
              'package.address::varchar',
              'package.services::varchar',
              'package.created_date',
              'package.updated_date',
              'package.base_price',
              'package.extra_cost_per_person',
              'package.max_extra_person',
              'package.currency_id',
              'package.price_note',
              'package.is_published',
              'package-destination.id',
              'package-destination.activity_package_id',
              'package-destination.place_name',
              'package-destination.place_description',
              'package-destination.latitude',
              'package-destination.longitude',
              'package-destination.created_date',
              'package-destination.updated_date',
              'package-destination-image.id',
              'package-destination-image.activity_package_destination_id',
              'package-destination-image.snapshot_img',
              'package-destination-image.created_date',
              'package-destination-image.updated_date',
            ])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .andWhere('activity-post.id = :id', { id: user.id })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
        case CategoryPost.cpAdvertisement: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.advertisement',
              ActivityAdvertisement,
              'advertisement',
              'advertisement.user_id::uuid = activity-post.user_id',
            )
            .innerJoinAndMapMany(
              'advertisement.advertisement_image',
              ActivityAdvertisementImage,
              'advertisement_image',
              'advertisement_image.activity_advertisement_id::uuid = advertisement.id',
            )
            .select([
              'activity-post',
              'advertisement.id',
              'advertisement.user_id',
              'advertisement.title',
              'advertisement.address::varchar',
              'advertisement.street',
              'advertisement.city',
              'advertisement.province',
              'advertisement.zip_code',
              'advertisement.ad_date',
              'advertisement.description',
              'advertisement.price',
              'advertisement.is_published',
              'advertisement.created_date',
              'advertisement.updated_date',
              'advertisement.activities::varchar',
              'advertisement.country',
              'advertisement_image.id',
              'advertisement_image.activity_advertisement_id',
              'advertisement_image.snapshot_img',
              'advertisement_image.created_date',
              'advertisement_image.updated_date',
            ])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .andWhere('activity-post.id = :id', { id: user.id })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
        case CategoryPost.cpArticle: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.article',
              ActivityArticle,
              'article',
              'article.user_id = :user_id',
              { user_id: user.user_id },
            )
            .select(['activity-post', 'article'])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .andWhere('activity-post.id = :id', { id: user.id })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
        case CategoryPost.cpEvent: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.event',
              ActivityEvent,
              'event',
              'event.user_id = :user_id',
              { user_id: user.user_id },
            )
            .innerJoinAndMapMany(
              'event.event_image',
              ActivityEventImage,
              'event_image',
              'event_image.activity_event_id::uuid = event.id',
            )
            .select([
              'activity-post',
              'event.id',
              'event.user_id',
              'event.badge_id',
              'event.title',
              'event.country',
              'event.address::varchar',
              'event.event_date',
              'event.description',
              'event.price',
              'event.is_published',
              'event.created_date',
              'event.updated_date',
              'event_image.id',
              'event_image.activity_event_id',
              'event_image.snapshot_img',
              'event_image.created_date',
              'event_image.updated_date',
            ])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .andWhere('activity-post.id = :id', { id: user.id })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
        case CategoryPost.cpNewsFeed: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.newsfeed',
              ActivityNewsfeed,
              'newsfeed',
              'newsfeed.user_id = activity-post.user_id',
            )
            .select(['activity-post', 'newsfeed'])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
        case CategoryPost.cpOutfitter: {
          const posts = await this.activityPostRepository
            .createQueryBuilder('activity-post')
            .innerJoinAndMapMany(
              'activity-post.outfitter',
              ActivityOutfitter,
              'outfitter',
              'outfitter.user_id = :user_id',
              { user_id: user.user_id },
            )
            .innerJoinAndMapMany(
              'outfitter.outfitter_image',
              ActivityOutfitterImage,
              'outfitter_image',
              'outfitter_image.activity_outfitter_id::uuid = outfitter.id',
            )
            .select([
              'activity-post',
              'outfitter.id',
              'outfitter.user_id',
              'outfitter.title',
              'outfitter.price',
              'outfitter.product_link',
              'outfitter.country',
              'outfitter.address',
              'outfitter.street',
              'outfitter.city',
              'outfitter.province',
              'outfitter.zip_code',
              'outfitter.availability_date',
              'outfitter.description',
              'outfitter.is_published',
              'outfitter.created_date',
              'outfitter.updated_date',
              'outfitter_image.id',
              'outfitter_image.activity_outfitter_id',
              'outfitter_image.snapshot_img',
              'outfitter_image.date_created',
              'outfitter_image.date_updated',
            ])
            .where('activity-post.user_id = :user_id', {
              user_id: user.user_id,
            })
            .andWhere('activity-post.category_type = :category_type', {
              category_type: user.category_type,
            })
            .andWhere('activity-post.id = :id', { id: user.id })
            .getMany();
          aggregatedPosts.push(posts);
          break;
        }
      }
    }
    return aggregatedPosts;
  }

  async getActivityPostByPostId(post_id: string) {
    return await this.activityPostRepository.findOne({
      where: { post_id: post_id },
    });
  }

  //activity post with pagination functionality
  async getActivityPostPagination(
    user_id: string,
    badge_id: string,
    title: string,
    paginationOptions: IPaginationOptions,
  ) {
    const query = await this.activityPostRepository
      .createQueryBuilder('activity')
      .select(
        'activity.id,activity.post_id,activity.user_id,activity.premium_user,activity.views, activity.category_type, activity.title, activity.main_badge_id, activity.activityBadgeId, activity.created_date,activity.firebase_snapshot_img,badge.badge_name, badge.badge_description, badge.firebase_snapshot_img as badge_firebase_snapshot_img',
      )
      .leftJoin('badge', 'badge', 'badge.id::text=activity.main_badge_id::text')
      .where('activity.user_id = :user_id', {
        user_id: user_id,
      });

    if (badge_id) {
      query.where('activity.main_badge_id::text = :main_badge_id::text', {
        main_badge_id: badge_id,
      });
    }

    if (title) {
      query.where('activity.title LIKE :title', {
        title: `%${title}%`,
      });
    }

    query.orderBy('activity.created_date', 'DESC');

    //const pageNum: number = parseInt(paginationOptions.page as any) || 1;
    const totalCount = await query.getCount();
    //console.log(paginationOptions.page * paginationOptions.limit);
    query
      .offset((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return {
      data: await query.getRawMany(),
      total: totalCount,
      page: paginationOptions.page,
      last_page: Math.ceil(totalCount / paginationOptions.limit),
    };
  }
}
