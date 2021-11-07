import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class StatusService extends TypeOrmCrudService<Status> {
  constructor(
    @InjectRepository(Status)
    private destinationsRepository: Repository<Status>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Status>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Status>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Status>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
