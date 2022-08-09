import { Module } from '@nestjs/common';
import { FcmDeviceTokenService } from './fcm-device-token.service';
import { FcmDeviceTokenController } from './fcm-device-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmDeviceToken } from './fcm-device-token.entity';

@Module({
  providers: [FcmDeviceTokenService],
  controllers: [FcmDeviceTokenController],
  exports: [FcmDeviceTokenService],
  imports: [TypeOrmModule.forFeature([FcmDeviceToken])],
})
export class FcmDeviceTokenModule {}
