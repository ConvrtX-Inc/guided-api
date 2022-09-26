import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { ActivityNewsfeed } from './activity-newsfeed.entity';
import { Badge } from '../badge/badge.entity';
import { ActivityPost } from '../activity-post/activity-post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ActivityNewsfeedService extends TypeOrmCrudService<ActivityNewsfeed> {
  constructor(
    @InjectRepository(ActivityNewsfeed)
    private activityPostRepository: Repository<ActivityNewsfeed>,
  ) {
    super(activityPostRepository);
  }

  async findOneEntity(options: FindOptions<ActivityNewsfeed>) {
    return this.activityPostRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityNewsfeed>) {
    return this.activityPostRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<ActivityNewsfeed>[]) {
    return this.activityPostRepository.save(
      this.activityPostRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.activityPostRepository.softDelete(id);
  }

  async approvedNewsfeed(id: string) {
    const post = await this.activityPostRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;
      await post.save();
    }
  }

  async rejectNewsfeed(id: string) {
    const post = await this.activityPostRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;
      await post.save();
    }
  }

  async getActivityNewsfeedList() {
    return this.activityPostRepository
      .createQueryBuilder('newsfeed')
      .leftJoinAndMapOne(
        'newsfeed.badge',
        Badge,
        'badge',
        'badge.id = newsfeed.main_badge_id',
      )
      .where('newsfeed.is_published = true')
      .getMany();
  }

  async getActivityNewsfeedDetail(id: string) {
    return this.activityPostRepository
      .createQueryBuilder('newsfeed')
      .leftJoinAndMapOne(
        'newsfeed.badge',
        Badge,
        'badge',
        'badge.id = newsfeed.main_badge_id',
      )
      .leftJoinAndMapOne(
        'newsfeed.post',
        ActivityPost,
        'post',
        'newsfeed.id = post.post_id',
      )
      .leftJoinAndMapOne(
        'post.publisher',
        User,
        'publisher',
        'publisher.id = post.user_id',
      )
      .leftJoinAndMapOne(
        'newsfeed.author',
        User,
        'author',
        'author.id = newsfeed.user_id',
      )
      .select([
        'newsfeed',
        'badge',
        'post',
        'author.id',
        'author.first_name',
        'author.last_name',
        'author.phone_no',
        'author.email',
        'publisher.id',
        'publisher.first_name',
        'publisher.last_name',
        'publisher.phone_no',
        'publisher.email',
      ])
      .where('newsfeed.id = :id', { id: id })
      .andWhere('post.is_published = true')
      .getMany();
  }
}
