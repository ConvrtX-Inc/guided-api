import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ActivityOutfitterImage } from './entities/activityOutfitterImage.entity';

@Injectable()
export class ActivityOutfitterImageService extends TypeOrmCrudService<ActivityOutfitterImage>{
    constructor(@InjectRepository(ActivityOutfitterImage)
    private outfitterRepository: Repository<ActivityOutfitterImage>,
    ) {
      super(outfitterRepository);
    }
}
