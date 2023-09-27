import { useState, useEffect, useContext } from "react";
import ListOfUsers from "../../users_area/list_of_users/ListOfUsers";
import ChatArea from "../Chat_area/ChatArea";
import "./ContactPane.css";
import { userService } from "../../../services/users_service/users-service";
import {
  setAllUserAction,
  usersReducer,
} from "../../../app_state_area/redux/users_state/users-state";
import {
  useAppDispatch,
} from "../../../hooks/redux_hooks/redux-hooks";
import UserModel from "../../../models/user_model/user-model";
import { AuthContext } from "../../../app_state_area/context/auth_provider_context/authProvider";
import {
  offUsersReducer,
  setAllOffUserAction,
} from "../../../app_state_area/redux/users_state/off-users-state";
function ContactPane(): JSX.Element {
  const [userConnected, setUserConnected] = useState<UserModel>();
  //Get token in AuthContext
  const contextToken = useContext(AuthContext);
   //Use the redux to adding the final result data onLineUsers and offLineUsers from server.
   const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [chooseUser, setChooseUser] = useState<UserModel>({
    firstName: "",
    lastName: "",
    birthDate: "",
    titleOfPost: "",
    textOfPost: "",
    userName: "",
    password: "",
    isLoggedIn: false,
    socketId: "",
  });
  const takeingChooseUser = (user: UserModel): UserModel => {
    setChooseUser(user);
    return user;
  };
  const [userDisconnected, setUserDisconnected] = useState<UserModel>();
  //Get all onLine and offLine users from server.
  const getAllUsers = async () => {
    let isSetLoading = false;
    const values = await userService.allUsers(contextToken.state.token);
    if (values) {
      let onLineUsers: UserModel[];
      let offLineUsers: UserModel[];
      if (values[0]) {
        onLineUsers = [...(values[0] as UserModel[])];
        if (onLineUsers){
          dispatch(usersReducer(setAllUserAction(onLineUsers)));
          isSetLoading = true;
        }
      }
      if (values[1]){
        offLineUsers = [...(values[1] as UserModel[])];
        if (offLineUsers) {
          dispatch(offUsersReducer(setAllOffUserAction(offLineUsers)));
          isSetLoading = true;
        }
      }
      setLoading(isSetLoading);
    }
  };
  const gettingUserConnected = (userConnect: UserModel) => {
    setUserConnected(userConnect);
  };
  const gettingUserDisconnected = (userDisconnect: UserModel) => {
    setUserDisconnected(userDisconnect);
  };
  useEffect(() => {
    getAllUsers();
  },[userConnected,userDisconnected]);
  return (
    <>
      {loading ? (
        <div className="ContactPane container-fluid h-100 w-100 p-0 m-0">
          <aside className="aside-for-list-of-users">
            <ListOfUsers takeingChooseUser={takeingChooseUser} />
          </aside>
          <main className="main-for-chat-ing-area">
            <ChatArea
              user={chooseUser}
              gettingUserConnected={gettingUserConnected}
              gettingUserDisconnected={gettingUserDisconnected}
            />
          </main>
        </div>
      ) : (
        <h1>Loading users...</h1>
      )}
    </>
  );
}
export default ContactPane;
