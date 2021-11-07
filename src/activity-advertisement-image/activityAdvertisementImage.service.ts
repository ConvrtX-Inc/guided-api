import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityAdvertisementImage } from './entities/activityAdvertisementImage.entity';

@Injectable()
export class ActivityAdvertisementImageService extends TypeOrmCrudService<ActivityAdvertisementImage>{
    constructor(@InjectRepository(ActivityAdvertisementImage)
    private outfitterRepository: Repository<ActivityAdvertisementImage>,
    ) {
      super(outfitterRepository);
    }
}
