import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendNotificationDto } from './dtos/send-notif.dto';

@Injectable()
export class FcmService {
  private fcmSendUrl = 'https://fcm.googleapis.com/fcm/send';
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendNotification(notif: SendNotificationDto): Promise<any> {
    const body = {
      registration_ids: notif.registration_ids,
      notification: {
        title: notif.title,
        body: notif.body,
        content_available: true,
        priority: 'high',
        icon: 'notification_icon',
      },
      data: notif.data,
    };

    const config = {
      headers: {
        Authorization: `key=${this.configService.get('fcm.serverKey')}`,
      },
    };
    try {
      const res = await this.httpService.axiosRef.post(
        this.fcmSendUrl,
        body,
        config,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
}
