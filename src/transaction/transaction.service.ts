import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { TransactionUserAndStatusDto } from './dtos/transaction-user-status.dto';
import { StatusService } from 'src/statuses/status.service';
import { Status } from 'src/statuses/status.entity';
import { TransactionGuideAndStatusDto } from './dtos/transaction-guide-status.dto';

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
      where: {
        tour_guide_id: user_id,
      },
    });
  }

  async getTransactionsByGuideAndStatus(transactionGuideAndStatusDto: TransactionGuideAndStatusDto) {
    const status = await getRepository(Status)
      .createQueryBuilder('status')
      .where('status.status_name = :status_name', { status_name: transactionGuideAndStatusDto.status.replace(/\b\w/g, (l) => l.toUpperCase()) })
      .getOne();

    return this.destinationsRepository.find({
      where: {
        tour_guide_id: transactionGuideAndStatusDto.tour_guide_id,
        status_id: status.id
      },
    });
  }

  async getTransactionsByUserAndStatus(transactionUserAndStatusDto: TransactionUserAndStatusDto) {
    const status = await getRepository(Status)
      .createQueryBuilder('status')
      .where('status.status_name = :status_name', { status_name: transactionUserAndStatusDto.status.replace(/\b\w/g, (l) => l.toUpperCase()) })
      .getOne();

    return this.destinationsRepository.find({
      where: {
        user_id: transactionUserAndStatusDto.user_id,
        status_id: status.id
      },
    });
  }

 async updateToRefunded(transaction_id: string) {
  const status = await getRepository(Status)
  .createQueryBuilder('status')
  .where({ status_name: "Refunded" })
  .getOne();

  let transaction = new Transaction();
  transaction.id = transaction_id;
  transaction.status_id = status.id;
  return this.destinationsRepository.update(transaction_id, transaction);
}


}
