import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FcmController } from './fcm.controller';
import { FcmService } from './fcm.service';

@Module({
  imports: [HttpModule],
  controllers: [FcmController],
  providers: [FcmService],
})
export class FcmModule {}
