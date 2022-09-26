export enum MessageStatus {
  msSent = 1,
  msSeen = 2,
  msDeleted = 3,
}

export class MessageDetailClass {
  private userid: string;
  private text: string;
  private status: number;
  private dateCreate: Date;
  private parentid: string;
  private sender_id: string;
  private receiver_id: string;
  private type: string;

  public constructor(
    userid: string,
    msg: string,
    status: number,
    dateCreate: Date,
    parent_id: string,
    sender_id: string,
    receiver_id: string,
    type: string,
  ) {
    this.userid = userid;
    this.text = msg;
    this.status = status;
    this.dateCreate = dateCreate;
    this.parentid = parent_id;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.type = type;
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

  get SenderID(): string {
    return this.sender_id;
  }

  get ReceiverID(): string {
    return this.receiver_id;
  }

  get getType(): string {
    return this.type;
  }
}
