import Header from "../header/Header";
import "./Layout.css";
import Main from "./../main/Main";
import ListOfUsers from "../../users_area/list_of_users/ListOfUsers";
import UserModel from "../../../models/user_model/user-model";
import { useState, useEffect } from "react";
import AuthProvider from "../../../app_state_area/context/auth_provider_context/authProvider";
import { BrowserRouter } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux_hooks/redux-hooks";
import { chooseUserReducer } from "../../../app_state_area/redux/users_state/choose-user-state";
function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  //State hold the user choose by the current user and to sending message her/him.
  const [user, setUser] = useState<UserModel>({
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
    setUser(user);
    dispatch(chooseUserReducer({ activeChooseUser: user, status: true }));
    return user;
  };

  return (
    <div className="Layout container bg-secondary h-100 p-0">
      <BrowserRouter>
        <AuthProvider>
          <header className="container-fluid bg-info p-0 m-0">
            <Header></Header>
          </header>
          <aside>
            <ListOfUsers takeingChooseUser={takeingChooseUser} />
          </aside>
          <main>
            <Main />
          </main>
          <footer className="container-fluid bg-info">
            All rights &copy; reserved
          </footer>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
