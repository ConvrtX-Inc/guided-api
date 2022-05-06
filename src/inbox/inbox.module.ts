import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/messages/messages.entity';

@Module({
  controllers: [InboxController],
  providers: [InboxService],
  imports: [TypeOrmModule.forFeature([Messages])]
})
export class InboxModule {}
