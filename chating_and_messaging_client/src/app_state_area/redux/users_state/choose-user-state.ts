import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../../models/user_model/user-model";
import { RootState } from "../configurer_store/configurer-store";
export interface ChooseUserState {
  activeChooseUser:UserModel;
  status:boolean;
}
const initialState = {
  activeChooseUser: {
    _id:"",
    firstName: "",
    lastName: "",
    birthDate: "",
    titleOfPost: "",
    textOfPost: "",
    userName: "",
    password: "",
    imageOfPost: undefined,
    isLoggedIn: false,
    socketId: "",
  },
  status: false,
};
export const chooseUserSlice = createSlice({
    name:"chooseUser",
    initialState,
    reducers:{
      chooseUserReducer:(state, action: PayloadAction<ChooseUserState>) => {
            //@ts-ignore
            state.activeChooseUser = action.payload.activeChooseUser as UserModel;
            state.status=action.payload.status;
        },
    },
});
//Choose User state  
export default    chooseUserSlice.reducer;
export const {chooseUserReducer} =chooseUserSlice.actions;
export const selectChooseUser =(state:RootState)=>state.chooseUserState;
