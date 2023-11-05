import React, { useState, useEffect, useContext, useRef } from "react";
import "./ChatArea.css";
import { useSocket } from "../../../hooks/use_socket_hooks/useSocket";
import { Socket } from "socket.io-client";
import UserModel from "../../../models/user_model/user-model";
import ChatModel from "./../../../models/chat_model/chat-model";
import { AuthContext } from "../../../app_state_area/context/auth_provider_context/authProvider";
import { useAppSelector } from "../../../hooks/redux_hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import config from "../../../services/config_url/config";
import { userChatsService } from "../../../services/chat_service/chat-service";
interface ChatAreaProps {
  user?: UserModel;
  gettingUserConnected?: (userConnected: UserModel) => void;
  gettingUserDisconnected?: (userDisconnected: UserModel) => void;
}
function ChatArea(props: ChatAreaProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigateTo = useNavigate();
  //Get token from AuthContext
  const { state } = useContext(AuthContext);
  //Choose user from  redux means get the activeChooseUser.
  const chooseUserState = useAppSelector((state) => {
    return state.chooseUserState.activeChooseUser;
  });
  //Profile user from  redux .
  const profileUserState = useAppSelector((state) => {
    return state.profileUserState.profileUser;
  });
  //Use socket  hook and define config socket.io-client options.
  const socket: Socket = useSocket(config.mainServerUrl, {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  });
  //The active user related to the current request in a web application.
  const [profile, setProfile] = useState<UserModel>();
  //The user want to  choose and send message.
  const [userChoose, setUserChoose] = useState<UserModel>();
  //The value of textArea that taking when text area changed.
  const [value, setValue] = useState<string>();
  //All history of  messages that sending.
  const [historyMesSend, setHistoryMesSend] = useState<ChatModel[]>([]);
  //All history of  messages that receiving.
  const [historyMesReceive, setHistoryMesReceive] = useState<ChatModel[]>([]);
  // This function is triggered when textarea changes
  const textAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value);
  };
  async function handleKeyPress(event: React.KeyboardEvent): Promise<void> {
    if (event.key === "Enter") {
      //@ts-ignore
      const sender: UserModel = profile;
      //@ts-ignore
      const receiver: UserModel = userChoose;
      const currentChat: ChatModel = {
        sender: {
          ...sender,
        },
        receiver: {
          ...receiver,
        },
        message: {
          message: value as string,
          date: new Date().toLocaleTimeString(),
          isLoggedIn: true,
        },
      } as ChatModel;
      currentChat.sender.imageOfPost = undefined;
      currentChat.receiver.imageOfPost = undefined;
      //hello server i want chatting
      socket?.emit("hello server i want chatting", currentChat);
      let sendHistory: ChatModel[] = [];
      sendHistory = [...historyMesSend];
      sendHistory.push(currentChat);
      setHistoryMesSend(sendHistory);
      //@ts-ignore
      if (textAreaRef.current) {
        textAreaRef.current.value = "" as any;
      }
      //sending request from profile to server for saving this specific chat.
      const message = {
        message: currentChat.message.message,
        date: currentChat.message.date,
      };
      await userChatsService.addSpecificChat(
        state.token,
        message,
        sender?._id as string,
        receiver?._id as string
      );
    }
  }
  //Get all profile and guest specific chats history from server.
  const isChooseUserChanged = async (currentUser: UserModel) => {
    if (currentUser._id) {
      if (currentUser?._id !== userChoose?._id) {
        const senderId = profile?._id;
        const receiverId = currentUser?._id;
        //Get Array of Array chats  from server.
        let allSpecificChats: any;
        if (state?.token) {
          allSpecificChats = await userChatsService.allSpecificChats(
            state.token as any,
            receiverId as any,
            senderId as any
          );
        }
        if (allSpecificChats) {
          if (allSpecificChats[1]) {
            let takeGuestChatsHistory: any[] = allSpecificChats[1].map(
              (data: any) => {
                return {
                  sender: undefined,
                  receiver: undefined,
                  message: {
                    message: data.message,
                    date: data.date,
                    isLoggedIn: undefined,
                  },
                };
              }
            );
            //Copy Guests chats history  from server.
            let guestsHistory: ChatModel[] = [];
            guestsHistory = [...(takeGuestChatsHistory as ChatModel[])];
            //All history of  messages that receiver taking from profile.
            setHistoryMesReceive(guestsHistory as ChatModel[]);
          }
        }
        if (allSpecificChats) {
          if (allSpecificChats[0]) {
            let takeProfilesChatsHistory: any[] = allSpecificChats[0].map(
              (data: any) => {
                return {
                  sender: undefined,
                  receiver: undefined,
                  message: {
                    message: data.message,
                    date: data.date,
                    isLoggedIn: undefined,
                  },
                };
              }
            );
            //Copy profiles history of messages from server..
            let profilesHistory: ChatModel[] = [];
            profilesHistory = [...(takeProfilesChatsHistory as ChatModel[])];
            //history of  messages profile taking from guest/receiver.
            setHistoryMesSend(profilesHistory);
          }
        }
      }
    }
  };
  const settingTextFromFriends =async (messageHistory: ChatModel) => {
    const promise = new Promise((res, rej) => {
    if (messageHistory) {
      let takeHistory: ChatModel[] = [];
      //takeHistory = [...historyMesReceive];
      takeHistory = historyMesReceive;
      //takeHistory.push(messageHistory);
       takeHistory.push(messageHistory);
      setHistoryMesReceive(takeHistory);
     res(takeHistory);
    }
     rej(messageHistory);
     });
    const allReceiveMessages = (await promise) as ChatModel[];
    if (allReceiveMessages) {
      setHistoryMesReceive(allReceiveMessages);
    } else {
      console.log("no receive messages");
    }
  };
  useEffect(() => {
    socket.connect();
    //start the listeners
    StartListeners();
    if(profileUserState){
      setProfile(profileUserState);
    }
  }, []);
  useEffect(() => {
    if (props.user){
      //chooseUserState
      isChooseUserChanged(chooseUserState);
    }
    //From props
    setUserChoose(props.user);
    //From redux
    setUserChoose(chooseUserState);
  }, [chooseUserState,props]);
  const StartListeners = () => {
    //User Connected event
    socket.on("user_connected",(userConnected:UserModel) => {
      if (props.gettingUserConnected) {
        props.gettingUserConnected(userConnected);
      }
    });
    //Hello client starting chatting.
    socket.on("hello client starting chatting", (message: ChatModel) => {
      message.receiver.imageOfPost = undefined;
      message.receiver.imageOfPost = undefined;
      settingTextFromFriends(message);
    });
    socket.on("user_disconnected", (disconnectedUser: UserModel) => {
      if (props.gettingUserDisconnected) {
        props.gettingUserDisconnected(disconnectedUser);
      }
      //disconnectedUser.userName
      // const credentialModel = await authService.logoutWithDisconnectedUser(
      //   disconnectedUser
      // );
      //useAuthCont.dispatch(credentialModel);
      navigateTo("/");
    });
    //reconnect event
    socket.io.on("reconnect", (attempt) => {
      console.log("reconnect:" + attempt);
    });
    //reconnect attempt event
    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("reconnect_attempt :" + attempt);
    });
    //reconnect Error
    socket.io.on("reconnect_error", (error) => {
      console.log("reconnection error :" + error);
    });
    //reconnect failed
    socket.io.on("reconnect_failed", () => {
      console.log("reconnect_failed :");
    });
  };
  return (
    <>
      <>History</>
      <div className="ChatArea container-fluid h-100  w-100  p-0 m-0">
        <div className="chat-area-container">
          <div className="profile-chat-area-container container-fluid h-100 w-100 p-0 m-0">
            {historyMesSend?.map((chat: ChatModel, index) => {
              return (
                <div key={index} className="card  bg-gradient h-25 w-100 b-1">
                  <div className="card-body">
                    <h5 className="card-title">{chat.sender?.firstName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {chat.message.message}
                    </h6>
                    <p className="card-text">{chat.message.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="friends-chat-area-container  container-fluid  h-100 w-100 p-0 m-0 ">
             <div className="friends-chat-area-container container-fluid  h-100 w-100 p-0 m-0">
            {historyMesReceive?.map((chat: ChatModel, index) => {
              return (
                <div key={index} className="card  bg-gradient h-25 w-100 b-1">
                  <div className="card-body historyMesReceive-card-body">
                    <h5 className="card-title">{chat.sender?.firstName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {chat.message.message}
                    </h6>
                    <p className="card-text">{chat.message.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
        <div className="textarea-form-container container-fluid h-100 w-100 p-0 m-0">
          <textarea
            ref={textAreaRef}
            className="form-control"
            h-75
            w-100
            p-0
            m-0
            placeholder="Write message to send and press enter key"
            id="floatingTextarea"
            onChange={textAreaChange}
            onKeyDown={handleKeyPress}
          ></textarea>
        </div>
      </div>
    </>
  );
}
export default ChatArea;
