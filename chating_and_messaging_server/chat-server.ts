import express, { Express, Request, Response, request } from "express";
import http from "http";
import cors from "cors";
import funcConnectDB from "./data_access_layer/data-access-layer";
import expressFileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { ServerSocket } from "./socket";
import dotenv from "dotenv";
import authController from "./controllers/authentication_controller/authentication-controller";
import usersController from "./controllers/users_controller/users-controller";
import chatController from "./controllers/chat_controller/chat-controller"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
export const serverSocket: ServerSocket = new ServerSocket(server);
dotenv.config();
app.use(expressFileUpload());
const port = process.env.PORT || 4000;
//Connected to mongoDb
funcConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/authentication", authController);
app.use("/users", usersController);
app.use("/chats",chatController);
app.use("*", (request: Request, response: Response) => {
  return response.status(404).json("not found");
});
server.listen(port, () => {
  setInterval(() => {
    console.log(`server is up on http://localhost:${port}`);
  }, 3000);
});
