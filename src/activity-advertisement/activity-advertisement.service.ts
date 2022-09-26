import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { DeepPartial, getRepository, Repository } from 'typeorm';
import { ActivityAdvertisement } from './entities/activity-advertisement.entity';
import { AdvertisementUserAndStatusDto } from './dtos/advertisement-user-status.dto';
import { BookingRequestStatus } from 'src/booking-request/booking-request-status';
import { StatusService } from 'src/statuses/status.service';
import { Status } from 'src/statuses/status.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ActivityAdvertisementService extends TypeOrmCrudService<ActivityAdvertisement> {
  constructor(
    @InjectRepository(ActivityAdvertisement)
    private advertisementRepository: Repository<ActivityAdvertisement>,
    private statusService: StatusService,
  ) {
    super(advertisementRepository);
  }

  async findOneEntity(options: FindOptions<ActivityAdvertisement>) {
    return this.advertisementRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityAdvertisement>) {
    return this.advertisementRepository.find({
      where: options.where,
    });
  }

  async saveEntity(data: DeepPartial<ActivityAdvertisement>) {
    return this.advertisementRepository.save(
      this.advertisementRepository.create(data),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.advertisementRepository.softDelete(id);
  }

  async approvedActivityAdvertisement(id: string) {
    const post = await this.advertisementRepository.findOne({
      where: { id: id },
    });
    const status = await this.statusService.findOne({
      status_name: BookingRequestStatus.approved,
    });
    if (post) {
      post.status_id = status.id;
      post.is_published = true;
      await post.save();
    }
  }

  async rejectActivityAdvertisement(id: string) {
    const post = await this.advertisementRepository.findOne({
      where: { id: id },
    });
    const status = await this.statusService.findOne({
      status_name: BookingRequestStatus.rejected,
    });
    if (post) {
      post.status_id = status.id;
      post.is_published = false;
      await post.save();
    }
  }

  async getadvertisementsByUserAndStatus(user_id: string, status: string) {
    let returnResponse = [];
    let transactions;
    if (status.toLowerCase() === 'all') {
      transactions = await this.advertisementRepository.find({
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
      transactions = await this.advertisementRepository.find({
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
      transactions[i]['status'] = await getRepository(Status)
        .createQueryBuilder('status')
        .where({ id: transactions[i].status_id })
        .getOne();
      returnResponse.push(transactions[i]);
    }
    return returnResponse;
  }
}
