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
import { stat } from 'fs';

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
    console.log('Tourguide ID:' + user_id);
    return this.destinationsRepository.find({
      where: {
        tour_guide_id: user_id,
      },
    });
  }

  async getTransactionsByGuideAndStatus(tour_guide_id: string, status: string) {
    console.log('Tourguide ID:' + tour_guide_id);
    console.log('Status: ' + status);
    const returnResponse = [];
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
        .where('status.status_name = :status_name', {
          status_name: status.replace(/\b\w/g, (l) => l.toUpperCase()),
        })
        .getOne();
      transactions = await this.destinationsRepository.find({
        where: {
          tour_guide_id: tour_guide_id,
          status_id: stat.id,
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
      transactions[i]['status'] = await getRepository(Status)
        .createQueryBuilder('status')
        .where({ id: transactions[i].status_id })
        .getOne();
      returnResponse.push(transactions[i]);
    }
    return returnResponse;
  }

  async getTransactionsByUserAndStatus(user_id: string, status: string) {
    console.log('user:' + user_id);
    console.log('status:' + status);
    const returnResponse = [];
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
        .where('status.status_name = :status_name', {
          status_name: status.replace(/\b\w/g, (l) => l.toUpperCase()),
        })
        .getOne();
      transactions = await this.destinationsRepository.find({
        where: {
          user_id: user_id,
          status_id: stat.id,
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
      transactions[i]['status'] = await getRepository(Status)
        .createQueryBuilder('status')
        .where({ id: transactions[i].status_id })
        .getOne();
      returnResponse.push(transactions[i]);
    }
    return returnResponse;
  }

  async updateToRefunded(transaction_id: string) {
    const status = await getRepository(Status)
      .createQueryBuilder('status')
      .where({ status_name: 'Refunded' })
      .getOne();

    const transaction = new Transaction();
    transaction.id = transaction_id;
    transaction.status_id = status.id;
    return this.destinationsRepository.update(transaction_id, transaction);
  }

  async getEarnings(tour_guide_id: string) {
    let totalEarning = 0.0;
    let pending = 0.0;
    let personalBalance = 0.0;
    const pendingName = 'Pending';
    let pendingStatusId = '';
    const completedName = 'Completed';
    let completedStatusId = '';

    const stats = await getRepository(Status).find();

    for (const s in stats) {
      if (stats[s].status_name == pendingName) {
        pendingStatusId = stats[s].id;
      } else if (stats[s].status_name == completedName) {
        completedStatusId = stats[s].id;
      }
    }

    const trans = await this.destinationsRepository.find({
      where: {
        tour_guide_id: tour_guide_id,
      },
    });

    for (const i in trans) {
      personalBalance = +personalBalance + +trans[i].total;
      if (trans[i].status_id == completedStatusId) {
        totalEarning = +totalEarning + +trans[i].total;
      }
      if (trans[i].status_id == pendingStatusId) {
        pending = +pending + +trans[i].total;
      }
    }

    const result =
      '{' +
      '"total":' +
      totalEarning +
      ',' +
      '"pending":' +
      pending +
      ',' +
      '"personal":' +
      personalBalance +
      '}';
    return result;
  }
}
