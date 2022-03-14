import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country> {
  constructor(
    @InjectRepository(Country)
    private destinationsRepository: Repository<Country>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Country>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Country>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Country>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.destinationsRepository.delete(id);
  }
}
