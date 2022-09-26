import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class CurrencyService extends TypeOrmCrudService<Currency> {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {
    super(currencyRepository);
  }

  async findOneEntity(options: FindOptions<Currency>) {
    return this.currencyRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Currency>) {
    return this.currencyRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<Currency>) {
    return this.currencyRepository.save(this.currencyRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.currencyRepository.softDelete(id);
  }
}
