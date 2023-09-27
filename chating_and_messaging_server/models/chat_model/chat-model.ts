import { MessageModel } from "../message_model/message-model";
import { UserModel } from '../user_schema/user-schema';
export class ChatModel {
  sender?:typeof UserModel;
  receiver?:typeof UserModel;
   message?:MessageModel;
    constructor(
    sender?:typeof UserModel,
    receiver?:typeof UserModel,
    message?: MessageModel
  ) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
  }
}

