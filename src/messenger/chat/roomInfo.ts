import { MessageDetailClass } from '../message/messageDetail';

export class RoomInfo {    
  private _roomID: string;    
  public UserMessages = '';    
  public UserMessageDetail: MessageDetailClass;
    
  constructor(room) {        
    this._roomID = room;   
    this.UserMessages = '';        
  }
      
  get RoomID(): string {
    return this._roomID;
  }
          
}  