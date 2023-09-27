import { Nav, NavItem, NavLink } from "reactstrap";
import "./MenuBarLargerScreens.css";
import { useContext} from "react";
import {
  AuthContext,
  useAuthContext,
} from "../../../app_state_area/context/auth_provider_context/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authentication_service/auth-service";
import UserModel from "../../../models/user_model/user-model";
import {
  setAllUserAction,
  usersReducer,
} from "../../../app_state_area/redux/users_state/users-state";
import {
  offUsersReducer,
  setAllOffUserAction,
} from "../../../app_state_area/redux/users_state/off-users-state";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux_hooks/redux-hooks";
import { chooseUserReducer } from "../../../app_state_area/redux/users_state/choose-user-state";
import CredentialModel from "../../../models/login_model/logModel";
function MenuBarLargerScreens(): JSX.Element {
  const useAuthCont = useAuthContext();
  const { state } = useContext(AuthContext);
  //Choose user from  redux means get the activeChooseUser.
  const chooseUserState = useAppSelector((state) => {
    return state.chooseUserState.activeChooseUser;
  });
  //Choose user statues from  redux
  const chooseUserStatus = useAppSelector((state) => {
    return state.chooseUserState.status;
  });
  const contextToken = useContext(AuthContext);
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const reSetAllUsers = () => {
    const onLineUsers: UserModel[] = [];
    const offLineUsers: UserModel[] = [];
    dispatch(usersReducer(setAllUserAction(onLineUsers)));
    dispatch(offUsersReducer(setAllOffUserAction(offLineUsers)));
  };
  const LogOut = async () => {
    const payload = {
      activeChooseUser: {
        _id: "",
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
    if (contextToken?.state?.token) {
      const credentialModel: CredentialModel = await authService.logout(
        contextToken.state.token
      );
      if (!credentialModel.isLoggedIn){
        useAuthCont.dispatch(credentialModel);
        //Added the choose user in to state choose user store.
        dispatch(chooseUserReducer(payload));
        //Reset all online users
        reSetAllUsers();
      }
    }
    navigateTo("/");
  };
  return (
    <div className="MenuBarLargerScreens">
      {state?.isLoggedIn ? (
        <Nav justified pills>
          <NavItem>
            <Link to="/help-how-to-this-site">Help</Link>
          </NavItem>
          <NavItem>
            <Link to="/chat-area">Back</Link>
          </NavItem>
          <NavItem>
            <Link to="/update-user">Update</Link>
          </NavItem>
          <NavItem>
            <Link to="/delete-user">Delete</Link>
          </NavItem>
          <NavItem>
            <NavLink onClick={LogOut} active>
              logout
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        <Nav justified pills>
          <NavItem h-100 w-50>
            <Link to="/help-how-to-this-site">Help</Link>
          </NavItem>
          <NavItem>
            <Link to="/">login</Link>
          </NavItem>
        </Nav>
      )}
    </div>
  );
}
export default MenuBarLargerScreens;
