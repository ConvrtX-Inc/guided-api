import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Faq } from './faq.entity';

@Injectable()
export class FaqService extends TypeOrmCrudService<Faq> {
  constructor(
    @InjectRepository(Faq)
    private contactUsRepository: Repository<Faq>,
  ) {
    super(contactUsRepository);
  }

  async findOneEntity(options: FindOptions<Faq>) {
    return this.contactUsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Faq>) {
    return this.contactUsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Faq>[]) {
    return this.contactUsRepository.save(this.contactUsRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.contactUsRepository.softDelete(id);
  }
}
