import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../../models/user_model/user-model";
import { RootState } from "../configurer_store/configurer-store";
export interface ProfileUserState {
  profileUser: UserModel;
}
const initialState = {
  profileUser: {
    firstName: "",
    lastName: "",
    birthDate: "",
    titleOfPost: "",
    textOfPost: "",
    userName: "",
    password: "",
    imageOfPost:undefined,
    isLoggedIn: false,
    socketId: "",
  },
};
export const profileUserSlice = createSlice({
  name: "profileUser",
  initialState,
  reducers: {
    //(state, action: PayloadAction<UsersAction>)
    profileUserReducer: (state, action: PayloadAction<ProfileUserState>) => {
      //@ts-ignore
      state.profileUser = action.payload.profileUser as UserModel;
    },
  },
});
//Choose User state
export default profileUserSlice.reducer;
export const { profileUserReducer } = profileUserSlice.actions;
export const selectProfileUser = (state: RootState) => state.profileUserState;
