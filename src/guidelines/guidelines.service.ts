import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Guideline } from './entities/guideline.entity';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';

@Injectable()
export class GuidelinesService extends TypeOrmCrudService<Guideline> {
  constructor(
    @InjectRepository(Guideline)
    private destinationRepository: Repository<Guideline>
  ){
    super(destinationRepository);
  }
  async findOneEntity(options: FindOptions<Guideline>) {
    return this.destinationRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Guideline>) {
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

  async saveEntity(data: DeepPartial<Guideline>[]) {
    return this.destinationRepository.save(
      this.destinationRepository.create(data),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.destinationRepository.softDelete(id);
  }
}
