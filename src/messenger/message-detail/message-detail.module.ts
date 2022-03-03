import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageDetailService } from './message-detail.service';
import { MessageDetail } from './message-detail.entity';
//import { ParticipantService } from '../participant/participant.service';  
//import { ParticipantModule } from '../participant/participant.module'; 
import { MessageDetailController } from './message-detail.controller';

@Module({
  controllers: [MessageDetailController],
  providers: [MessageDetailService],
  imports: [TypeOrmModule.forFeature([MessageDetail])],
  exports: [MessageDetailService],
})

export class MessageDetailModule {}

