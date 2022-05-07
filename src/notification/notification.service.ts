import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { BookingRequestService } from 'src/booking-request/booking-request.service';

@Injectable()
export class NotificationService extends TypeOrmCrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
    private bookingRequestSvc: BookingRequestService
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
      where: {
        user_id: user_id,
      },
    });
  }

  async getNotifications(notifications) {
    let notifs = await Promise.all(
      notifications.map(async (n) => {
        if (n.booking_request_id) {
          const booking_request = await this.bookingRequestSvc.findOne({
            where: { id: n.booking_request_id },
          });

          if (booking_request) {
            n.booking_request = {
              id: booking_request.id,
              status: booking_request.status.status_name,
              from_user: booking_request.from_user_id,
              to_user: booking_request.user_id,
              is_approved: booking_request.is_approved
            };
          }
        }

        return n;

      })
    );

    ///Sort notifications
    notifs = notifs.sort((a: any, b: any) => {

      let date1 = new Date(a?.created_date)
      let date2 = new Date(b?.created_date)
      return date2.valueOf() - date1.valueOf();
    });

    return notifs;
  }

  async getTravelerNotifications(user_id: string, filter: string) {
    let notifications: any = await this.repository.find({
      where: {
        to_user_id: user_id,
      },
    });

    notifications = await this.getNotifications(notifications);

    switch (filter.toLowerCase()) {
      case 'all':
        return notifications
      case 'accepted':
        return notifications.filter((n) => n.booking_request.is_approved);
      case 'rejected':
        return notifications.filter((n) => !n.booking_request.is_approved);
    }

  }
}
