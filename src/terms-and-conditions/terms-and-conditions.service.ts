import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { TermsAndCondition } from './terms-and-condition.entity';

@Injectable()
export class TermsAndConditionService extends TypeOrmCrudService<TermsAndCondition> {
  constructor(
    @InjectRepository(TermsAndCondition)
    private TermsAndConditionsRepository: Repository<TermsAndCondition>,
  ) {
    super(TermsAndConditionsRepository);
  }

  async findOneEntity(options: FindOptions<TermsAndCondition>) {
    return this.TermsAndConditionsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<TermsAndCondition>) {
    return this.TermsAndConditionsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<TermsAndCondition>[]) {
    return this.TermsAndConditionsRepository.save(
      this.TermsAndConditionsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.TermsAndConditionsRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.TermsAndConditionsRepository.delete(id);
  }
}
