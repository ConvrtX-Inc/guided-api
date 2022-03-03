import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LawsAndTaxes } from './laws-and-taxes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class LawsAndTaxesService extends TypeOrmCrudService<LawsAndTaxes> {
  constructor(
    @InjectRepository(LawsAndTaxes)
    private lawsAndTaxesRepository: Repository<LawsAndTaxes>,
  ) {
    super(lawsAndTaxesRepository);
  }

  async findOneEntity(options: FindOptions<LawsAndTaxes>) {
    return this.lawsAndTaxesRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<LawsAndTaxes>) {
    return this.lawsAndTaxesRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<LawsAndTaxes>[]) {
    return this.lawsAndTaxesRepository.save(
      this.lawsAndTaxesRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.lawsAndTaxesRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.lawsAndTaxesRepository.delete(id);
  }
}
