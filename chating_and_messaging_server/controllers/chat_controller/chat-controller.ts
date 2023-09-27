import express, {Request, Response} from "express";
import { authenticateTokenBodyWithParm } from "../../middlewares/auth_token_body_withPam.ts/auth-token-body-withPam";
import chatBusinessLogic from "../../business_logic/chat_business_logic/chat-business-logic";
import { authTokenReceiverIdAndSenderId } from "../../middlewares/auth_token_body_receivIdAndSenId/auth-token-body-receiver-sender-id";
import usersBusinessLogic from "../../business_logic/users_business_logic/users-business-logic";
const router = express.Router();
// the secret key
const secret: any = process.env.ACCESS_TOKEN_SECRET;
//Get all specific chat history.
router.post(
  "/allChats",
  authTokenReceiverIdAndSenderId,
  async (request: any, response: Response) => {
    try {
      const { payload, accessValidToken, refreshToken, receiverId, senderId } =
        request.payload as {
          payload: any;
          accessValidToken: any;
          refreshToken: any;
          receiverId: any;
          senderId: any;
        };
      const guestChats = await chatBusinessLogic.allSpecificChatHistory(
        receiverId,
        senderId
      );
      if (guestChats) {
        return response.json(guestChats);
      }
    } catch (err) {
      return response.json("The source is not found 404!");
    }
  }
);
router.get("/:_id", async (request: Request, response: Response) => {
  const _id = request.params._id;
    const user = await usersBusinessLogic.getOneUser(_id);
    try {
      if (user) {
        response.json(user);
      }
    } catch (err) {
      response.json("The source is not found 404!");
    }
});
//Saving specific chat history.
router.post(
  "/",
  authenticateTokenBodyWithParm,
  async (request: any, response: Response) => {
    try {
      const {
        payload,
        accessValidToken,
        refreshToken,
        message,
        senderId,
        receiverId,
      } = request.payload as {
        payload: any;
        accessValidToken: any;
        refreshToken: any;
        message: any;
        senderId: any;
        receiverId: any;
      };
      const chatSchemaObj = {
        senderId: senderId,
        message: message.message,
        date: message.date,
        receiverId: receiverId,
      };
      const addedChat = await chatBusinessLogic.saveSpecificChatHistory(
        chatSchemaObj
      );
      response.json(addedChat);
    } catch (error) {}
  }
);
export default router;
