import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../../utils/types/deep-partial.type';
import { FindOptions } from '../../utils/types/find-options.type';

import { Message } from './message.entity';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class MessageService extends TypeOrmCrudService<Message> {    
  public newRoomID: any;    

  constructor(
    @InjectRepository(Message)
    private msgRepository: Repository<Message>,
    _participantService: ParticipantService,
  ) {
    super(msgRepository);
  }

  async findOneEntity(options: FindOptions<Message>) {
    return this.msgRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Message>) {
    return this.msgRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Message>[]) {
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
      message : msg,
    });
  }  

  async filterMessages(user_id: string, filter: string) {
    switch(filter){
      case 'all':
        return this.msgRepository.find({
          where:  {
            user_id: user_id,
          },
        });
      break;
      case 'unread':
        return this.msgRepository.find({
          where:  {
            user_id: user_id,
            is_read: false 
          },
        });
      break;
      case 'spam':
        return this.msgRepository.find({
          where:  {
            user_id: user_id,
            is_spam: true 
          },
        });
      break;
      case 'sent':
        return this.msgRepository.find({
          where:  {
            user_id: user_id,
            is_sent: true 
          },
        });
      break;
      case 'archive':
        return this.msgRepository.find({
          where:  {
            user_id: user_id,
            is_archive: true 
          },
        });
      break;
    }

  }  
 

}
