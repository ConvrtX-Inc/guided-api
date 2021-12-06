import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityAdvertisement } from './entities/activityAdvertisement.entity';

@Injectable()
export class ActivityAdvertisementService extends TypeOrmCrudService<ActivityAdvertisement>{
    constructor(@InjectRepository(ActivityAdvertisement)
    private advertisementRepository: Repository<ActivityAdvertisement>,
    ) {
      super(advertisementRepository);
    }
  
    async softDelete(id: string): Promise<void> {
      await this.advertisementRepository.softDelete(id);
    }

    async approvedActivityAdvertisement(id: string) {    
      const post = await this.advertisementRepository.findOne({
        where: { id: id },
      });
      if (post) {
        post.is_published = true;      
        await post.save();
      }
    }

    async rejectActivityAdvertisement(id: string) {    
      const post = await this.advertisementRepository.findOne({
        where: { id: id },
      });
      if (post) {
        post.is_published = false;      
        await post.save();
      }
    }
}
