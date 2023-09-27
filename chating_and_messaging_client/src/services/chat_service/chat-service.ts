import UserModel from "./../../models/user_model/user-model";
import ChatModel from "../../models/chat_model/chat-model";
import axios from "axios";
import config from "../config_url/config";
const users_url = process.env.USERS_URL;
class UserChatsService {
  public async allSpecificChats(
    token: any,
    receiverId: string,
    senderId: string
  ): Promise<any> {
    try {
      const response = await axios.post<ChatModel[]>(
        `${config.chatsUrl}/allChats`,
        {
          token: token,
          receiverId: receiverId,
          senderId: senderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (err) {
      return err;
    }
    return null;
  }
  public async addSpecificChat(
    token: string,
    message: any,
    senderId: string,
    receiverId: string
  ): Promise<any> {
    const bodyParameters = {
      token: token,
      message: message,
      senderId: senderId,
      receiverId: receiverId,
    } as {
      token: string;
      message: any;
      senderId: string;
      receiverId: string;
    };
    const response = await axios.post<any>(
      `${config.chatsUrl}`,
      bodyParameters,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = response;
    return data;
  }
  public async deleteChat(_id:any): Promise<UserModel> {
    const response = await axios.delete(`${users_url}/deleteChat/{_id}`);
    const data = response.data;
    return data;
  }
}
export const userChatsService = new UserChatsService();
