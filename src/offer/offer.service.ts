import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class OfferService extends TypeOrmCrudService<Offer> {
  constructor(
    @InjectRepository(Offer)
    private destinationsRepository: Repository<Offer>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Offer>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Offer>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Offer>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
