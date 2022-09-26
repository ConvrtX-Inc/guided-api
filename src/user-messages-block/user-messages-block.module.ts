import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBlockMessages } from './user-message-block.entity';
import { UserMessagesBlockController } from './user-messages-block.controller';
import { UserMessagesBlockService } from './user-messages-block.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBlockMessages])],
  controllers: [UserMessagesBlockController],
  providers: [UserMessagesBlockService],
  exports: [UserMessagesBlockService],
})
export class UserMessagesBlockModule {}
