import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FreeServices } from './free-services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class FreeServicesService extends TypeOrmCrudService<FreeServices> {
  constructor(
    @InjectRepository(FreeServices)
    private destinationsRepository: Repository<FreeServices>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<FreeServices>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<FreeServices>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<FreeServices>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
