import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

@Injectable()
export class ActivityOutfitterService extends TypeOrmCrudService<ActivityOutfitter>{
  constructor(@InjectRepository(ActivityOutfitter)
  private outfitterRepository: Repository<ActivityOutfitter>,
  ) {
    super(outfitterRepository);
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
