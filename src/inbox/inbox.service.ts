import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Messages } from 'src/messages/messages.entity';
import { User } from 'src/users/user.entity';
import { Notification } from 'src/notification/notification.entity';
import { Repository } from 'typeorm';
import { Block } from 'src/block/entities/block.entity';

@Injectable()
export class InboxService extends TypeOrmCrudService<Messages> {
  constructor(
    @InjectRepository(Messages)
    private inboxRepository: Repository<Messages>,
  ) {
    super(inboxRepository);
  }

  async getMessagesList(user_id: string) {
    const inboxList: Array<Messages[]> = [];
    const uniqueSenderId = await this.inboxRepository
      .createQueryBuilder('inboxlist')
      .select(['inboxlist.sender_id'])
      .distinctOn(['inboxlist.sender_id'])
      .where('inboxlist.receiver_id = :id', { id: user_id })
      .getMany();

    for (const senderId of uniqueSenderId) {
      const messages = await this.inboxRepository
        .createQueryBuilder('inboxlist')
        .innerJoinAndMapMany(
          'inboxlist.notification',
          Notification,
          'notification',
          'inboxlist.id = notification.message_id',
        )
        .innerJoinAndMapMany(
          'notification.user',
          User,
          'user',
          'user.id = inboxlist.sender_id::uuid',
        )
        .select([
          'inboxlist.sender_id',
          'inboxlist.message',
          'notification.created_date',
          'user.full_name',
          'user.profile_photo_firebase_url',
        ])
        .addSelect((subQueryCount) => {
          return subQueryCount
            .select('COUNT(message.is_read)')
            .from(Messages, 'message')
            .where('message.is_read = false')
            .andWhere('message.receiver_id = :id', { id: user_id })
            .andWhere('message.sender_id = :sid', { sid: senderId.sender_id })
            .groupBy('message.sender_id');
        }, 'inboxlist_count_msg')
        .addSelect((subQueryBlock) => {
          return subQueryBlock
            .select('COUNT(block.blocked)')
            .from(Block, 'block')
            .where('block.blocked = :sid', { sid: senderId.sender_id })
            .andWhere('block.blocked_by = :id', { id: user_id })
            .groupBy('block.blocked');
        }, 'inboxlist_block_msg')
        .andWhere('inboxlist.receiver_id = :id', { id: user_id })
        .andWhere('inboxlist.sender_id = :sid', { sid: senderId.sender_id })
        .addOrderBy('notification.created_date', 'DESC')
        .limit(1)
        .getRawMany();
      if (messages[0].inboxlist_block_msg < 1) {
        inboxList.push(messages);
      }
    }
    return inboxList;
  }

  async messageDelete(sender_id: string): Promise<void> {
    await this.inboxRepository.delete({ sender_id });
  }
}
