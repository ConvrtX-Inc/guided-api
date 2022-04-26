import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../../utils/types/deep-partial.type';
import { FindOptions } from '../../utils/types/find-options.type';

import { MessageDetail } from './message-detail.entity';
import { UsersService } from 'src/users/users.service';
import { groupBy } from 'rxjs';
//import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class MessageDetailService extends TypeOrmCrudService<MessageDetail> {
  public newRoomID: any;

  constructor(
    @InjectRepository(MessageDetail)
    private msgRepository: Repository<MessageDetail>,
    private userSvc: UsersService
    //_participantService: ParticipantService,
  ) {
    super(msgRepository);
  }

  async findOneEntity(options: FindOptions<MessageDetail>) {
    return this.msgRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<MessageDetail>) {
    return this.msgRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<MessageDetail>[]) {
    return this.msgRepository.save(
      this.msgRepository.create(data),
    );
  }

  async delete(id: number): Promise<void> {
    await this.msgRepository.delete(id);
  }

  async updateMessage(id: string, msg: string) {
    return await this.msgRepository.update({
      id,
    }, {
      message: msg,
    });
  }

  async filterMessages(user_id: string, filter: string) {
    switch (filter) {
      case 'all':
        // return this.msgRepository.find({
        //   where:  {
        //     user_id: user_id,
        //   },
        // });
        const messages = await this.msgRepository.find({
          where: {
            user_id: user_id,
          },

        });
        return this.getDetailedChatMessages(messages);

      case 'unread':
        return this.msgRepository.find({
          where: {
            user_id: user_id,
            is_read: false
          },
        });
        break;
      case 'spam':
        return this.msgRepository.find({
          where: {
            user_id: user_id,
            is_spam: true
          },
        });
        break;
      case 'sent':
        return this.msgRepository.find({
          where: {
            user_id: user_id,
            is_sent: true
          },
        });
        break;
      case 'archive':
        return this.msgRepository.find({
          where: {
            user_id: user_id,
            is_archive: true
          },
        });
        break;
    }

  }


  async getDetailedChatMessages(messages: MessageDetail[]) {
    if (messages.length > 0) {
      let chatMessages = [];

      let rooms = [...new Set(messages.map(item => item.message_id))];

      for (var i = 0; i < rooms.length; i++) {
        const msgs = messages.filter((m) => m.message_id == rooms[i]);


        let chatDetails =
          msgs[0];

        let receiver_id = chatDetails.sender_id == msgs[0].user_id ? chatDetails.receiver_id : chatDetails.sender_id;
        const receiver = await this.userSvc.findOneEntity({ where: { id: receiver_id } });

        const receiverDetails = {
          id: receiver.id,
          full_name: receiver.full_name,
          avatar: receiver.profile_photo_firebase_url,
          isOnline: receiver.is_online
        }

        const chat = {
          user_id: msgs[0].user_id,
          room_id: rooms[i],
          receiver: receiverDetails,
          messages: msgs
        }


        chatMessages.push(chat)


      }

      chatMessages = chatMessages.sort((a, b) => {

        let date1 = new Date(a.messages[a.messages.length - 1].created_date)
        let date2 = new Date(b.messages[b.messages.length - 1].created_date)
        return date2.valueOf() - date1.valueOf();
      });

      return chatMessages;
    }
    else {
      return messages;
    }

  }

}


