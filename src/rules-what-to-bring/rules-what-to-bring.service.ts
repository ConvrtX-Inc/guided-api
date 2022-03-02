import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RulesWhatToBring } from './rules-what-to-bring.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class RulesWhatToBringService extends TypeOrmCrudService<RulesWhatToBring> {
  constructor(
    @InjectRepository(RulesWhatToBring)
    private rulesWhatToBringsRepository: Repository<RulesWhatToBring>,
  ) {
    super(rulesWhatToBringsRepository);
  }

  async findOneEntity(options: FindOptions<RulesWhatToBring>) {
    return this.rulesWhatToBringsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<RulesWhatToBring>) {
    return this.rulesWhatToBringsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<RulesWhatToBring>[]) {
    return this.rulesWhatToBringsRepository.save(
      this.rulesWhatToBringsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.rulesWhatToBringsRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.rulesWhatToBringsRepository.delete(id);
  }
}
