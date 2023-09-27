import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from "../users_state/users-state";
import { offUsersSlice } from "../users_state/off-users-state";
import stateChooseUser from "../users_state/choose-user-state";
import stateProfileUser from "../profile_state/profile";
export const store = configureStore({
  reducer:{
    userStateReducer: usersSlice.reducer,
    chooseUserState: stateChooseUser,
    offLineUsersState: offUsersSlice.reducer,
    profileUserState:stateProfileUser,
  },
});
//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch