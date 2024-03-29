import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageDetailService } from './message-detail.service';
import { MessageDetail } from './message-detail.entity';
//import { ParticipantService } from '../participant/participant.service';
//import { ParticipantModule } from '../participant/participant.module';
import { MessageDetailController } from './message-detail.controller';
import { UsersModule } from 'src/users/users.module';
import { UserMessagesBlockModule } from 'src/user-messages-block/user-messages-block.module';

@Module({
  controllers: [MessageDetailController],
  providers: [MessageDetailService],
  imports: [
    TypeOrmModule.forFeature([MessageDetail]),
    UsersModule,
    UserMessagesBlockModule,
  ],
  exports: [MessageDetailService],
})
export class MessageDetailModule {}
