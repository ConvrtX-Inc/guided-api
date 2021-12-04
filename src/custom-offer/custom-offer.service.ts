import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { CustomOffer } from './custom-offer.entity';

@Injectable()
export class CustomOfferService extends TypeOrmCrudService<CustomOffer> {
  constructor(
    @InjectRepository(CustomOffer)
    private activityPostRepository: Repository<CustomOffer>    
  ) {
    super(activityPostRepository);
  }

  async findOneEntity(options: FindOptions<CustomOffer>) {
    return this.activityPostRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<CustomOffer>) {
    return this.activityPostRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<CustomOffer>[]) {
    return this.activityPostRepository.save(this.activityPostRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.activityPostRepository.softDelete(id);
  }
 


}
