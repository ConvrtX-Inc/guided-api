import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { ActivityAdvertisement } from './entities/activity-advertisement.entity';

@Injectable()
export class ActivityAdvertisementService extends TypeOrmCrudService<ActivityAdvertisement>{
    constructor(@InjectRepository(ActivityAdvertisement)
    private advertisementRepository: Repository<ActivityAdvertisement>,
    ) {
      super(advertisementRepository);
    }

    async findOneEntity(options: FindOptions<ActivityAdvertisement>) {
      return this.advertisementRepository.findOne({
        where: options.where,
      });
    }
  
    async findManyEntities(options: FindOptions<ActivityAdvertisement>) {
      return this.advertisementRepository.find({
        where: options.where,
      });
    }
  
    async saveEntity(data: DeepPartial<ActivityAdvertisement>) {
      return this.advertisementRepository.save(this.advertisementRepository.create(data));
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