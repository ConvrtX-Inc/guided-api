import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Waiver } from './waiver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class WaiverService extends TypeOrmCrudService<Waiver> {
  constructor(
    @InjectRepository(Waiver)
    private waiversRepository: Repository<Waiver>,
  ) {
    super(waiversRepository);
  }

  async findOneEntity(options: FindOptions<Waiver>) {
    return this.waiversRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Waiver>) {
    return this.waiversRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Waiver>[]) {
    return this.waiversRepository.save(this.waiversRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.waiversRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.waiversRepository.delete(id);
  }
}
