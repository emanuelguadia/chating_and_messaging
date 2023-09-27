import { Socket } from "socket.io-client";
import { createContext, useContext } from "react";
import UserModel from "../../../models/user_model/user-model";
export interface ISocketContextState{
  socket: Socket | undefined;
  uid: string;
  users:UserModel[];
}
export const defaultSocketContextState:ISocketContextState={
  socket: undefined,
  uid: "",
  users:[],
};
export type TSocketContextActions =
  | 'update_socket'
  | 'update_uid'
  | 'update_users'
  | 'update_user'
  | 'add_user'
  | 'add_all_users'
  | 'remove_user';
export type TSocketContextPayload = string | UserModel[] | UserModel| Socket;
export interface ISocketContextActions{
  type: TSocketContextActions;
  payload:TSocketContextPayload;
}


export const SocketReducer = (
  state:ISocketContextState,
  action:ISocketContextActions
) => {
  console.log(" state:ISocketContextState=defaultSocketContextState,............")
  console.log(state)
  console.log("action:ISocketContextActions.....................................")
  console.log(action.type)
  console.log(action.payload)
  switch (action.type) {
    case "update_socket":
      console.log("...update_socket...state, users:action.payload as UserModel[]")
      console.log(state);
      console.log(action.type);
      console.log(action.payload);
      return { ...state, socket:action.payload as Socket};
    case "update_uid":
      console.log("...update_uid...state, users:action.payload as UserModel[]")
      console.log(state);
      console.log(action.type);
      console.log(action.payload);
      return { ...state, uid:action.payload as string };
      case "add_user":
        console.log("...adding the final result users from server add_user ...state, users:action.payload as UserModel[]")
        console.log(state);
        console.log(action.type);
        console.log(action.payload);
      return { ...state, 
        users: state.users.push(action.payload as UserModel)
      };
    case "add_all_users":
      console.log("...adding the final result allUsers from server add_all_users ...state, users:action.payload as UserModel[]")
      console.log(state);
      console.log(action.type);
      console.log(action.payload);
      return { ...state, users:action.payload as UserModel[]};
    case "remove_user":
      console.log("...removing the users state, remove_user........ ");
      console.log(action.type);
      console.log(action.payload);
      return {
        ...state,
        users: state.users.filter((user:UserModel) => {
          return user.userName !== (action.payload as string);
        }),
      };
      default:
        return{...state}
  }
};
export interface ISocketContextProps{
    socketState:ISocketContextState;
    SocketDispatch:React.Dispatch<ISocketContextActions>;
};
 const SocketContext = createContext<ISocketContextProps>({
    socketState:defaultSocketContextState,
    SocketDispatch:()=>{},
});

export const SocketContextConsumer= SocketContext.Consumer;
export const SocketContextProvider= SocketContext.Provider;
export default SocketContext;

