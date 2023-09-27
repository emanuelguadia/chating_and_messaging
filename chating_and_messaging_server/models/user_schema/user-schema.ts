// user.model.ts
import { Document, Schema, model } from 'mongoose';
// Create the interface
interface IUser extends Document {
  firstName: { type: string };
  lastName: { type: string };
  birthDate: { type: string };
  titleOfPost: { type: string };
  textOfPost: { type: string };
  //email1
  userName: {
    type: string;
    require: [true, "User must include Email of user"];
    unique: true;
    minlength: 5;
    lowercase: true;
  };
  password: {
    type: string;
    unique: true;
    require: [true, "User must include  Password of user"];
    minlength: 5;
    lowercase: true;
  };
  imageOfPost: {
    data: Buffer;
    contentType: string;
  };
  isLoggedIn: {type:boolean};
  socketId: { type: string };
}
// Create the schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: String, required: true },
    titleOfPost: { type: String, required: true },
    textOfPost: { type: String, required: true },
    //email1
    userName: {
      type: String,
      unique: true,
      require: [true, "User must include Email of user"],
      required: true,
      minlength: 5,
      trim: true,
    },
    password: {
      type: String,
      unique: true,
      require: [true, "User must include  Password of user"],
      minlength: 5,
    },
    imageOfPost: {
      data: Buffer,
      contentType: String,
    },
    isLoggedIn: { type: Boolean },
    socketId: { type: String },
  }
);
//Create and export user model
export const UserModel = model<IUser>("UserModel", userSchema, "users");





