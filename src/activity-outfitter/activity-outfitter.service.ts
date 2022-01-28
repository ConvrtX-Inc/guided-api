import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

@Injectable()
export class ActivityOutfitterService extends TypeOrmCrudService<ActivityOutfitter>{
  constructor(@InjectRepository(ActivityOutfitter)
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
}
