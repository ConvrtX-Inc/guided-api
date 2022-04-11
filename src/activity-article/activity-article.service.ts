import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { ActivityArticle } from './activity-article.entity';

@Injectable()
export class ActivityArticleService extends TypeOrmCrudService<ActivityArticle> {
  constructor(
    @InjectRepository(ActivityArticle)
    private activityArticleRepository: Repository<ActivityArticle>,
  ) {
    super(activityArticleRepository);
  }

  async findOneEntity(options: FindOptions<ActivityArticle>) {
    return this.activityArticleRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityArticle>) {
    console.log(options.where);
    return this.activityArticleRepository.find({
      relations: ['articleImage'],
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<ActivityArticle>[]) {
    return this.activityArticleRepository.save(
      this.activityArticleRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.activityArticleRepository.softDelete(id);
  }

  async approvedArticle(id: string) {
    const post = await this.activityArticleRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;
      await post.save();
    }
  }

  async rejectArticle(id: string) {
    const post = await this.activityArticleRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;
      await post.save();
    }
  }

  async getArticlesWithImage() {
    return await this.activityArticleRepository.find({
      relations: ['articleImage'],
    });
  }
}
