import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Status } from 'src/statuses/status.entity';
import { User } from 'src/users/user.entity';
import { ActivityPackage } from 'src/activity-package/activity-package.entity';

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

  async getTransactionsByGuideAndStatus(tour_guide_id: string, status: string) {
    let returnResponse = [];
    let transactions;
    if (status.toLowerCase() === 'all') {
      transactions = await this.destinationsRepository.find({
        where: {
          tour_guide_id: tour_guide_id,
        },
      });
    } else {
      const stat = await getRepository(Status)
        .createQueryBuilder('status')
        .where('status.status_name = :status_name', { status_name: status.replace(/\b\w/g, (l) => l.toUpperCase()) })
        .getOne();

      transactions = await this.destinationsRepository.find({
        where: {
          tour_guide_id: tour_guide_id,
          status_id: stat.id
        },
      });
    }

    for (const i in transactions) {
      transactions[i]['user'] = await getRepository(User)
        .createQueryBuilder('user')
        .where({ id: tour_guide_id })
        .getOne();

      transactions[i]['activity_package'] = await getRepository(ActivityPackage)
        .createQueryBuilder('activitypackage')
        .where({ id: transactions[i].activity_package_id })
        .getOne();

      returnResponse.push(transactions[i])
    }

    return returnResponse;
  }

  async getTransactionsByUserAndStatus(user_id: string, status: string) {
    let returnResponse = [];
    let transactions;
    if (status.toLowerCase() === 'all') {
      transactions = await this.destinationsRepository.find({
        where: {
          user_id: user_id,
        },
      });
    } else {
      const stat = await getRepository(Status)
        .createQueryBuilder('status')
        .where('status.status_name = :status_name', { status_name: status.replace(/\b\w/g, (l) => l.toUpperCase()) })
        .getOne();

      transactions = await this.destinationsRepository.find({
        where: {
          user_id: user_id,
          status_id: stat.id
        },
      });
    }

    for (const i in transactions) {
      transactions[i]['user'] = await getRepository(User)
        .createQueryBuilder('user')
        .where({ id: user_id })
        .getOne();

      transactions[i]['activity_package'] = await getRepository(ActivityPackage)
        .createQueryBuilder('activitypackage')
        .where({ id: transactions[i].activity_package_id })
        .getOne();

      returnResponse.push(transactions[i])
    }

    return returnResponse;
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
