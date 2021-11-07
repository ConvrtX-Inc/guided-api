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
}
