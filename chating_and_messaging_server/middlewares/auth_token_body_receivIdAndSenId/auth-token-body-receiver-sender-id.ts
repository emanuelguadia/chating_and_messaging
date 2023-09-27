import { Response } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { UserModel } from "./../../models/user_schema/user-schema";
type MyUserModel = InstanceType<typeof UserModel>;
dotenv.config();
export const authTokenReceiverIdAndSenderId = (
  req: any,
  res: Response,
  next: any
) => {
  const { token, receiverId, senderId } = req.body as {
    token: any;
    receiverId: string;
    senderId: string;
  };
  if (!token) {
    return res.status(403).json("null");
  }
  const { accessValidToken, refreshToken } = token;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(accessValidToken, secret, (error: any, payload: any) => {
    if (error) {
      return res.sendStatus(401);
    }
    const payloadData = {
      payload: payload,
      accessValidToken: accessValidToken,
      refreshToken: refreshToken,
      receiverId: receiverId,
      senderId: senderId,
    };
    req.payload = payloadData;
    next();
  });
};
