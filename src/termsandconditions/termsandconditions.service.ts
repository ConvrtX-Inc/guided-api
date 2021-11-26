import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { Termsandcondition } from './entities/termsandcondition.entity';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class TermsandconditionsService extends TypeOrmCrudService<Termsandcondition> {
  constructor(
    @InjectRepository(Termsandcondition)
    private destinationRepository: Repository<Termsandcondition>,
  ) {
    super(destinationRepository);
  }

  async findOneEntity(options: FindOptions<Termsandcondition>) {
    return this.destinationRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Termsandcondition>) {
    return this.destinationRepository.find({
      where: options.where,
    });
  }

  async getOneData(id: string) {
    await this.destinationRepository.findOne(id);
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Termsandcondition>[]) {
    return this.destinationRepository.save(
      this.destinationRepository.create(data),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.destinationRepository.softDelete(id);
  }
}
