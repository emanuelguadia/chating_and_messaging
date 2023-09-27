import MessageModel from "../message_model/message-model";
import UserModel from "../user_model/user-model";
interface ChatModel{
  sender: UserModel;
  receiver: UserModel;
  message: MessageModel;
}
export default ChatModel;


