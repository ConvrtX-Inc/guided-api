import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Messages } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Messages> {
  constructor(
    @InjectRepository(Messages)
    private destinationsRepository: Repository<Messages>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Messages>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Messages>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Messages>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
