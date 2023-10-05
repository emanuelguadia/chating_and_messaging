import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { ChatModel } from "./models/chat_model/chat-model";
import usersBusinessLogic from "./business_logic/users_business_logic/users-business-logic";
//model to use for temporary user object.
type User = {
  userName: string;
  password: string;
  socketId: string;
  isLogIn: boolean;
};
export class ServerSocket {
  public static instance: ServerSocket;
  //temporary user
  public tempUser: User = {
    userName: "",
    password: "",
    socketId: "",
    isLogIn: false,
  };
  public io: Server;
  public sockets: Socket[];
  //@ts-ignore
  public usersOnline: UserModel[];
  //@ts-ignore
  private currentChat: ChatModel;
  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.usersOnline = [];
    this.sockets = [];
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });
    this.io.on("connect", this.StartListeners);
  }
  //Start listeners
  StartListeners = async (socket: Socket) => {
    console.info("Message received from:-" + " " + `${socket.id}`);
    if (
      this.tempUser.userName &&
      this.tempUser.password &&
      this.tempUser.isLogIn &&
      !this.tempUser.socketId
    ) {
      const connectUser = await usersBusinessLogic.getOneUserWithUserName(
        this.tempUser.userName
      );
      if (connectUser) {
        //@ts-ignore
        connectUser.socketId = socket.id;
        this.usersOnline.push(connectUser);
        this.sockets.push(socket);
        //Do this  connectUser.password = "";  because do not want to return password to client from server.
         //@ts-ignore
         const responseUser: UserModel = {...connectUser};
         responseUser.password = "";
         responseUser.socketId ="";
        //@ts-ignore
         responseUser?.imageOfPost ="";
        //Sending message to all users that tell this user is connected.
        this.sockets?.map((socket: Socket) => {         
          socket.emit("user_connected",responseUser);
        });
      }
      //Return the tempUser object to starting point.
      this.tempUser = {
        userName: "",
        password: "",
        socketId: "",
        isLogIn: false,
      };
    }
    //listening to  client  a specific to chat with another user
    //Start listening a chat with user
    socket.on(
      "hello server i want chatting",
      (message: ChatModel, userId: string) => {
        this.currentChat = message;
        //Finding the specific receiver user to chat with her/him.
        //@ts-ignore
        const receiverEmail: string = message?.receiver?.userName;
        const userToFound = this.usersOnline?.find((user) => {
          return user?.userName == receiverEmail;
        });
        if (userToFound) {
          //Finding the specific receiver user's  socket for sending message to him/her.
          const socketToFound: Socket = this?.sockets?.find(
            (socket: Socket) => socket?.id == userToFound?.socketId
          ) as Socket;
          if (socketToFound) {
            //Sending message  to specific receiver user  found
            socketToFound.emit(
              "hello client starting chatting",
              this?.currentChat
            );
          }
        }
      }
    );
    //Disconnect
    socket.on("disconnect", () => {
      //@ts-ignore
      const disconnectUser: UserModel = this.usersOnline.find((user) => {
        return user?.socketId == socket.id;
      });
      if (disconnectUser){
        const responseDisconnected = {...disconnectUser};
        if (this.usersOnline){
          this.usersOnline=[...this.usersOnline.filter((user:any)=>{
           return user.socketId !== socket?.id
          })]
        }
        if(this.sockets){
          this.sockets=[...this?.sockets.filter((item:any)=>{
            return item?.id !== socket?.id
           })]
         
        }
        responseDisconnected.socketId = undefined;
        responseDisconnected.isLoggedIn = false;
        responseDisconnected.imageOfPost="";
        this.sockets?.map((socket: Socket) => {
          socket.emit("user_disconnected",responseDisconnected);
        });
      }
    });
  };
}
