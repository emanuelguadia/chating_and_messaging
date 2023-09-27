import UserModel from "../../../models/user_model/user-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export class UsersAppState {
  public users: UserModel[] = [];
}
export enum UsersActionType {
  AddUser = "AddUser",
  UpdateUser = "UpdateUser",
  DeleteUsers = "DeleteUsers",
  setAllUsers = "setAllUsers",
}
export interface UsersAction {
  type: UsersActionType;
  payload: any;
}
const initialState: UsersAppState = new UsersAppState();
export function addUserAction(userToAdd: UserModel): UsersAction {
  return { type: UsersActionType.AddUser, payload: userToAdd };
}
export function updateUserAction(userToUpdate: UserModel): UsersAction {
  return { type: UsersActionType.UpdateUser, payload: userToUpdate };
}
export function deleteUserAction(_id: string): UsersAction {
  return { type: UsersActionType.DeleteUsers, payload: _id };
}
export function setAllUserAction(allUsers: UserModel[]): UsersAction {
  return { type: UsersActionType.setAllUsers, payload: allUsers };
}
export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    usersReducer: (state, action:PayloadAction<UsersAction>) => {
      let newUsersAppState: UsersAppState = { ...state } as UsersAppState;
      switch (action.payload.type){
        case UsersActionType.AddUser:
          newUsersAppState.users.push(action.payload.payload);
          break;
        case UsersActionType.setAllUsers:
          newUsersAppState.users = action.payload.payload;
          break;
        case UsersActionType.UpdateUser:
          const index = newUsersAppState.users.findIndex((user: UserModel) => {
            return user._id === action.payload.payload._id;
          });
          newUsersAppState.users[index] = action.payload.payload;
          break;
        case UsersActionType.DeleteUsers:
          const indexToDelete = newUsersAppState.users.findIndex(
            (user: UserModel) => {
              return user._id === action.payload.payload;
            }
          );
          newUsersAppState.users.splice(indexToDelete,1);
          break;
      }
      return newUsersAppState;
    },
  },
});
export default usersSlice.reducer;
export const { usersReducer} = usersSlice.actions;

