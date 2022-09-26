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
    private customOfferRepository: Repository<CustomOffer>,
  ) {
    super(customOfferRepository);
  }

  async findOneEntity(options: FindOptions<CustomOffer>) {
    return this.customOfferRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<CustomOffer>) {
    return this.customOfferRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<CustomOffer>[]) {
    return this.customOfferRepository.save(
      this.customOfferRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.customOfferRepository.softDelete(id);
  }

  async withdrawOffer(id: string) {
    const offer = await this.customOfferRepository.findOne({
      where: { id: id },
    });
    if (offer) {
      offer.is_withdrawn = true;
      await offer.save();
    }
    const data = await this.customOfferRepository.findOne({
      where: { id: id },
    });
    return data;
  }
}
