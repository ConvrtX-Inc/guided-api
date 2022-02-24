import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class NotificationService extends TypeOrmCrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {
    super(repository);
  }

  async findOneEntity(options: FindOptions<Notification>) {
    return this.repository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Notification>) {
    return this.repository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Notification>[]) {
    return this.repository.save(
      this.repository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async getNotificationByUser(user_id: string) {
    return this.repository.find({
      where:  {
        user_id: user_id,
      },
    });    
  }
}
