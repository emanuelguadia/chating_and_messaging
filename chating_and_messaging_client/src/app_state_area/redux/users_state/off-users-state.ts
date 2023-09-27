import { Socket } from "socket.io-client";
import UserModel from "../../../models/user_model/user-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export class OffUsersAppState {
  public offUsers: UserModel[] = [];
  public socket: Socket | undefined;
  public uid: string = "";
}
export enum OffUsersActionType {
  AddUser = "AddUser",
  UpdateUser = "UpdateUser",
  DeleteUsers = "DeleteUsers",
  setAllUsers = "setAllUsers",
}
export interface OffUsersAction {
  type: OffUsersActionType;
  payload: any;
}
const initialState: OffUsersAppState = new OffUsersAppState();
export function addOffUserAction(userToAdd: UserModel): OffUsersAction {
  return { type: OffUsersActionType.AddUser, payload: userToAdd };
}
export function updateOffUserAction(userToUpdate: UserModel): OffUsersAction {
  return { type: OffUsersActionType.UpdateUser, payload: userToUpdate };
}
export function deleteOffUserAction(_id: string): OffUsersAction {
  return { type: OffUsersActionType.DeleteUsers, payload: _id };
}
export function setAllOffUserAction(allUsers: UserModel[]): OffUsersAction {
  return { type: OffUsersActionType.setAllUsers, payload: allUsers };
}
export const offUsersSlice = createSlice({
  name: "offUsers",
  initialState,
    reducers: {
        offUsersReducer: (state, action: PayloadAction<OffUsersAction>) => {
            let newUsersAppState: OffUsersAppState = { ...state } as OffUsersAppState;;
            switch (action.payload.type) {
                case OffUsersActionType.AddUser:
                    newUsersAppState.offUsers.push(action.payload.payload);
                    break;
                case OffUsersActionType.setAllUsers:
                    newUsersAppState.offUsers = action.payload.payload;
                    break;
                case OffUsersActionType.UpdateUser:
                    const index = newUsersAppState.offUsers.findIndex((user: UserModel) => {
                        return user._id === action.payload.payload;
                    });
                    newUsersAppState.offUsers[index] = action.payload.payload;
                    break;
                case OffUsersActionType.DeleteUsers:
                    const indexToDelete = newUsersAppState.offUsers.findIndex(
                        (user: UserModel) => {
                            return user._id === action.payload.payload;
                        }
                    );
                    newUsersAppState.offUsers.splice(indexToDelete, 1);
                    break;
            }
            return newUsersAppState;
        }
    }
});
export default offUsersSlice.reducer;
export const { offUsersReducer } =offUsersSlice.actions;
