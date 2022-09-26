import { Injectable } from '@nestjs/common';
import { Repository, UpdateDateColumn } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../../utils/types/deep-partial.type';
import { FindOptions } from '../../utils/types/find-options.type';

import { Room } from './room.entity';
import { ParticipantService } from '../participant/participant.service';
import { Participant } from '../participant/participant.entity';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.entity';
import { MessageDetail } from '../message-detail/message-detail.entity';
import { MessageDetailClass } from '../message/messageDetail';

import { classToPlain } from 'class-transformer';

@Injectable()
export class RoomService extends TypeOrmCrudService<Room> {
  public newRoomID: any;

  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private participantService: ParticipantService,
    private messageService: MessageService,
  ) {
    super(roomRepository);
  }

  async findOneEntity(options: FindOptions<Room>) {
    return this.roomRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Room>) {
    return this.roomRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Room>[]) {
    return this.roomRepository.save(this.roomRepository.create(data));
  }

  async delete(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }

  public ConnectConversation(user_id: string, recipient_id: string): any {
    this.insertRoom(user_id, recipient_id);
    return this.newRoomID;
  }

  async insertRoom(user_id, recipient_id): Promise<void> {
    const query = this.roomRepository.createQueryBuilder('room');
    let roomid: any;
    query.select('room.*');
    query.innerJoin(
      'participant',
      'p',
      "p.room_id::text = room.id::text AND p.user_id = '" + user_id + "'",
    );
    query.innerJoin(
      'participant',
      'p2',
      "p2.room_id::text = room.id::text AND p2.room_id::text = p.room_id::text AND p2.user_id = '" +
        recipient_id +
        "'",
    );
    query.where("room.type = 'conversation'");
    roomid = classToPlain(await query.getRawOne());

    if (roomid) {
      this.newRoomID = roomid.id;
    } else {
      const room = new Room();
      room.name = 'conversation';
      room.type = 'conversation';
      this.newRoomID = (await room.save()).id;

      const data1 = new Participant();
      data1.user_id = user_id;
      data1.room_id = this.newRoomID;
      await data1.save();

      const data2 = new Participant();
      data2.user_id = recipient_id;
      data2.room_id = this.newRoomID;
      await data2.save();
    }
  }

  public async saveMessagesofRoom(
    room_id: string,
    msg: string,
    msgdetail: MessageDetailClass,
  ) {
    let participantData = [];
    participantData = await this.participantService.find({
      where: { room_id: room_id },
    });
    for (let i = 0; i < participantData.length; i++) {
      let msgData = [];
      msgData = await this.messageService.find({
        where: { room_id: room_id, user_id: participantData[i].user_id },
      });

      if (msgdetail.ParentID != '') {
        const userMsgDetail = new MessageDetail();
        userMsgDetail.user_id = participantData[i].user_id;
        userMsgDetail.message_id = msgdetail.ParentID;
        userMsgDetail.message = msgdetail.Text;
        userMsgDetail.is_sent = true;

        userMsgDetail.sender_id = msgdetail.SenderID;
        userMsgDetail.receiver_id = msgdetail.ReceiverID;
        userMsgDetail.message_id = room_id;
        userMsgDetail.message_type = msgdetail.getType;

        await userMsgDetail.save();
      } else {
        const userMessage = new Message();
        userMessage.room_id = room_id;
        userMessage.user_id = participantData[i].user_id;
        userMessage.message = msgdetail.Text;
        userMessage.is_sent = true;
        await userMessage.save();
      }
    }
  }
}
