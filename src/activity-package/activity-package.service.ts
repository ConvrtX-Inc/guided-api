import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityPackage } from './activity-package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class ActivityPackageService extends TypeOrmCrudService<ActivityPackage> {
  constructor(
    @InjectRepository(ActivityPackage)
    private activityRepository: Repository<ActivityPackage>,
  ) {
    super(activityRepository);
  }

  async findOneEntity(options: FindOptions<ActivityPackage>) {
    return this.activityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityPackage>) {
    return this.activityRepository.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityPackage>) {
    return this.activityRepository.save(this.activityRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityRepository.softDelete(id);
  }

  async getActivityPackageByUser(user_id: string) {
    return this.activityRepository.find({
      where:  {
        user_id: user_id,
      },
    });    
  }

  async approvedActivityPackage(id: string) {    
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = true;      
      await post.save();
    }
  }

  async rejectActivityPackage(id: string) {    
    const post = await this.activityRepository.findOne({
      where: { id: id },
    });
    if (post) {
      post.is_published = false;      
      await post.save();
    }
  }

}
