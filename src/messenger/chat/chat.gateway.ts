import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,    
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';  

import { RoomService } from '../room/room.service';  
import { ClientSocketInfo } from './clientSocketInfo';  
import { RoomInfo } from './roomInfo';  
import { MessageDetailClass } from '../message/messageDetail';
import { MessageStatus } from '../message/messageDetail';
    
@WebSocketGateway({ namespace: '/messenger' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {  

  constructor(private _roomService: RoomService) {}
    
  @WebSocketServer() 
  wss: Server;  
  
  private logger: Logger = new Logger('ChatGateway');  
  private lstClients = [];    
  private lstRooms = [];    
  
  afterInit(server: Server) {
    this.logger.log('Initialized ChatGateway!');
  }
  
  handleConnection(client: Socket, ...args: any[]) {     
    this.logger.log(`Client connected: ${client.id}`);          
  }

  handleDisconnect(client: Socket) {        
    this.logger.log(`Client disconnected: ${client.id}`);  
    
    let room = this.getRoomOfClient(client); 
    if (room != '') {
      this.leaveRoom(client, room);
    }      
  }  

  @SubscribeMessage('connect_users')
  public async conect(client: Socket, payload: any): Promise<void> {    
    await this._roomService.insertRoom(payload.sender_id, payload.receiver_id);
    this.logger.log(`ConnectConversation` + this._roomService.newRoomID);  
    this.addClient(client,payload.sender_id, this._roomService.newRoomID);        
    this.joinRoom(client, this._roomService.newRoomID);    
  }

  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: any): void {         
    var curDate = new Date();
    let _message = new MessageDetailClass(payload.sender_id, payload.text, MessageStatus.msSent, curDate, payload.message_id , payload.sender_id, payload.receiver_id, payload.type);
    let room = this.getRoomOfClient(client); 
    this.addMessage(_message, room);
    this.wss.to(room).emit('msgToClient', _message);           
  }
  
  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    this.logger.log('joinRoom : '+room);
    client.join(room);
    client.emit('joinedRoom', room);
  }
  
  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    this.logger.log(`leaveRoom`); 
    client.leave(room);
    client.emit('leftRoom', room);    
    this.deleteClient(client);

    this.saveMessage(room);
  }    

  addClient(client: Socket, sender_id: string, room: string){    
    var c = new ClientSocketInfo(client.id, room, sender_id);    
    this.lstClients.push(c);        
    
    let objRoom = this.lstRooms.find(o => o.RoomID === room);    
    if (objRoom === undefined){
      var rm = new RoomInfo(room);      
      rm.UserMessages = '';
      this.lstRooms.push(rm);
    }    
  }

  deleteClient(client: Socket){        
    for (var i=0; i<this.lstClients.length; i++) {
      if (this.lstClients[i]['ClientID'] === client.id){
        this.lstClients.splice(i,1);        
        break;
      }
    }    
  }

  getRoomOfClient(client: Socket): string{   
    var res = '';     
    let objClient = this.lstClients.find(o => o.ClientID === client.id);  
    if (objClient != undefined){ 
      res = objClient.RoomID; 
    }    
    return res;  
  }
    
  async saveMessage(roomID: string) {
    this.logger.log('saveMessage:'+roomID); 
    let objRoom = this.lstRooms.find(o => o.RoomID === roomID);  
    if (objRoom != undefined){  
      //this.logger.log('saveMessage:'+objRoom.UserMessages); 
      if (objRoom.UserMessages != ''){
        await this._roomService.saveMessagesofRoom(roomID, objRoom.UserMessages, objRoom.UserMessageDetail);
        objRoom.UserMessages = '';
      }
    }
  }

  addMessage(UserMessage: MessageDetailClass, clientRoom: string){
    let objRoom = this.lstRooms.find(o => o.RoomID === clientRoom);        
    if (objRoom === undefined){      
      let myJSON = JSON.stringify(UserMessage);
      //marg here
      let msg = myJSON + ',\r\n';         
      var rm = new RoomInfo(clientRoom);  
      rm.UserMessages = msg;    
      rm.UserMessageDetail = UserMessage;  
      this.lstRooms.push(rm);
    }
    else {
      let myJSON = JSON.stringify(UserMessage);
      objRoom.UserMessages = objRoom.UserMessages  + myJSON + ',\r\n';   
      objRoom.UserMessageDetail = UserMessage;
     
      this.saveMessage(clientRoom);
       
    }
  }
  
  /*addMessage(UserMessage: MessageDetail, clientRoom: string){
    let objRoom = this.lstRooms.find(o => o.RoomID === clientRoom);        
    if (objRoom === undefined){      
      let myJSON = JSON.stringify(UserMessage);
      //marg here
      let msg = myJSON + ',\r\n';         
      var rm = new RoomInfo(clientRoom);  
      rm.UserMessages = msg;      
      this.lstRooms.push(rm);
    }
    else {
      //this.logger.log('addMessage:'+objRoom.UserMessages); 
      let myJSON = JSON.stringify(UserMessage);
      objRoom.UserMessages = objRoom.UserMessages  + myJSON + ',\r\n';   

      //this.logger.log('addMessage:'+objRoom.UserMessages.length); 
      if (objRoom.UserMessages.length > 500){
        this.saveMessage(clientRoom);
      }          
    }
  }*/
}
  