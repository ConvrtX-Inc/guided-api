import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';
import { ActivityOutfitterImage } from '../activity-outfitter-image/entities/activity-outfitter-image.entity';
import { ActivityPost } from '../activity-post/activity-post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ActivityOutfitterService extends TypeOrmCrudService<ActivityOutfitter> {
  constructor(
    @InjectRepository(ActivityOutfitter)
    private outfitterRepository: Repository<ActivityOutfitter>,
  ) {
    super(outfitterRepository);
  }

  async findOneEntity(options: FindOptions<ActivityOutfitter>) {
    return this.outfitterRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityOutfitter>) {
    return this.outfitterRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<ActivityOutfitter>) {
    return this.outfitterRepository.save(this.outfitterRepository.create(data));
  }

  async softDelete(id: string): Promise<void> {
    await this.outfitterRepository.softDelete(id);
  }

  async approvedActivityOutfitter(id: string) {
    const post = await this.outfitterRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;
      await post.save();
    }
  }

  async rejectActivityOutfitter(id: string) {
    const post = await this.outfitterRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;
      await post.save();
    }
  }

  async getOutfitterList() {
    return this.outfitterRepository
      .createQueryBuilder('outfitter')
      .leftJoinAndMapMany(
        'outfitter.outfitterimage',
        ActivityOutfitterImage,
        'outfitterimage',
        'outfitter.id = outfitterimage.activity_outfitter_id::uuid',
      )
      .leftJoinAndMapOne(
        'outfitter.post',
        ActivityPost,
        'post',
        'outfitter.id = post.post_id',
      )
      .leftJoinAndMapOne(
        'post.publisher',
        User,
        'publisher',
        'publisher.id = post.user_id',
      )
      .leftJoinAndMapOne(
        'outfitter.author',
        User,
        'author',
        'author.id = outfitter.user_id::uuid',
      )
      .select([
        'outfitter',
        'outfitterimage',
        'post',
        'author.id',
        'author.first_name',
        'author.last_name',
        'author.phone_no',
        'publisher.id',
        'publisher.first_name',
        'publisher.last_name',
        'publisher.phone_no',
      ])
      .where('post.is_published = true')
      .getMany();
  }
}
