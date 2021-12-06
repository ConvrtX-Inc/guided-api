import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class TransactionService extends TypeOrmCrudService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private destinationsRepository: Repository<Transaction>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Transaction>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Transaction>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Transaction>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }

  async getTransactionsByGuide(user_id: string) {
    return this.destinationsRepository.find({
      where:  {
        tour_guide_id: user_id,
      },
    });    
  }
}
