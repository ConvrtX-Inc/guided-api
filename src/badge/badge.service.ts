import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Badge } from './badge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class BadgeService extends TypeOrmCrudService<Badge> {
  constructor(
    @InjectRepository(Badge)
    private destinationsRepository: Repository<Badge>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Badge>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Badge>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async getOneData(id: string) {
    await this.destinationsRepository.findOne(id);
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Badge>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
