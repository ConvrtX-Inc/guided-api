import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendNotificationDto } from './dtos/send-notif.dto';
import { FcmService } from './fcm.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Firebase Cloud Messaging')
@Controller({
    path: 'fcm',
    version: '1',
})
export class FcmController {
    constructor(private service: FcmService) {

    }
    @Post('sendNotification')
    async sendNotification(@Body() dto: SendNotificationDto) {
       return await this.service.sendNotification(dto);
    }
}
