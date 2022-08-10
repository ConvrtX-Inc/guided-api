import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { BookingTransaction } from './booking-transaction.entity';

@Injectable()
export class BookingTransactionService extends TypeOrmCrudService<BookingTransaction> {
  constructor(
    @InjectRepository(BookingTransaction)
    private repository: Repository<BookingTransaction>,
  ) {
    super(repository);
  }

  async findOneEntity(options: FindOptions<BookingTransaction>) {
    return this.repository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<BookingTransaction>) {
    return this.repository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<BookingTransaction>[]) {
    return this.repository.save(this.repository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
