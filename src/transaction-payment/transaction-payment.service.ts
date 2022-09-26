import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { TransactionPayment } from './transaction-payment.entity';

@Injectable()
export class TransactionPaymentService extends TypeOrmCrudService<TransactionPayment> {
  constructor(
    @InjectRepository(TransactionPayment)
    private transactionPaymentRepository: Repository<TransactionPayment>,
  ) {
    super(transactionPaymentRepository);
  }

  async findOneEntity(options: FindOptions<TransactionPayment>) {
    return this.transactionPaymentRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<TransactionPayment>) {
    return this.transactionPaymentRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<TransactionPayment>[]) {
    return this.transactionPaymentRepository.save(
      this.transactionPaymentRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.transactionPaymentRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.transactionPaymentRepository.delete(id);
  }
}
