import { ChatModelSchema } from "../../models/chat_model_schema/chat-model-schema";
type ChatModelType = InstanceType<typeof ChatModelSchema>;
async function allSpecificChatHistory(
  receiverId: string,
  senderId: string
): Promise<any> {
  //All chats receiver take from sender
  const guestChats = new Promise(async (resolve, reject) => {
    let allRecChatHistories: ChatModelType[] = [];
    allRecChatHistories = await ChatModelSchema.find({
      receiverId: receiverId,
      senderId: senderId,
    });
    if (allRecChatHistories) {
      resolve(allRecChatHistories);
    } else {
      reject();
    }
  });
   //All chats sender take from  receiver
  const profilesChats = new Promise(async (resolve, reject) => {
    let allSenChatHistories: ChatModelType[] = [];
    allSenChatHistories = await ChatModelSchema.find({
      receiverId: senderId,
      senderId: receiverId,
    });
    if (allSenChatHistories) {
      resolve(allSenChatHistories);
    } else {
      reject();
    }
  });
  const values = await Promise.all([guestChats, profilesChats]);
  return values;
}
async function saveSpecificChatHistory(data: any): Promise<any> {
  const currentChat = new ChatModelSchema({
    message: data.message,
    date: data.date,
    senderId: data.senderId,
    receiverId: data.receiverId,
  });
  const addedChat = await currentChat.save();
  return addedChat;
}
export = { saveSpecificChatHistory, allSpecificChatHistory };
