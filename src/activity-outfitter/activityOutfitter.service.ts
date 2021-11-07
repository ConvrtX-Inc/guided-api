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
}
