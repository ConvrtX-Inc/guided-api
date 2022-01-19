export enum MessageStatus {
  msSent = 1, 
  msSeen = 2, 
  msDeleted = 3  
}

export class MessageDetailClass {
  private userid: string;
  private text: string;
  private status: number;
  private dateCreate: Date;
  private parentid: string;
   
  public constructor(userid: string, msg: string, status: number, dateCreate: Date, parent_id: string) {
    this.userid = userid;
    this.text = msg;
    this.status = status;
    this.dateCreate = dateCreate;   
    this.parentid = parent_id; 
  }

  get UserID(): string {
    return this.userid;
  }

  get Text(): string {
    return this.text;
  }

  get Status(): number {
    return this.status;
  }

  get dateCreated(): Date {
    return this.dateCreate;
  }

  get ParentID(): string {
    return this.parentid;
  }
   
}
  