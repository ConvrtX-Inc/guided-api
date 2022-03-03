import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    return this.activityPostRepository.save(this.activityPostRepository.create(data));
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
        case CategoryPost.cpEvent:  {
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
        case CategoryPost.cpEvent:  {
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

}
