import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSubscription } from './user-subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class UserSubscriptionService extends TypeOrmCrudService<UserSubscription> {
  constructor(
    @InjectRepository(UserSubscription)
    private subscriptionRepository: Repository<UserSubscription>,
  ) {
    super(subscriptionRepository);
  }

  async findOneEntity(options: FindOptions<UserSubscription>) {
    return this.subscriptionRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserSubscription>) {
    return this.subscriptionRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserSubscription>[]) {
    return this.subscriptionRepository.save(
      this.subscriptionRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.subscriptionRepository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
