import { Document, Schema, Types, model } from "mongoose";
// chat interface
export interface IChat extends Document {
  message: string;
  date: string;
  senderId: string;
  receiverId: Types.ObjectId;
}
// chat schema
const ChatSchema = new Schema<IChat>({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});
// create and export Chat model
export const ChatModelSchema = model<IChat>("ChatModelSchema", ChatSchema,"all_chats_histories");
