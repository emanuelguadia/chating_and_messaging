import { useContext, useState } from "react";
import "./BrandSelf.css";
import {
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import {
  AuthContext,
  useAuthContext,
} from "../../../app_state_area/context/auth_provider_context/authProvider";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authentication_service/auth-service";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux_hooks/redux-hooks";
import UserModel from "../../../models/user_model/user-model";
import {
  setAllUserAction,
  usersReducer,
} from "../../../app_state_area/redux/users_state/users-state";
import {
  offUsersReducer,
  setAllOffUserAction,
} from "../../../app_state_area/redux/users_state/off-users-state";
import { chooseUserReducer } from "../../../app_state_area/redux/users_state/choose-user-state";
function BrandSelf(): JSX.Element {
  const useAuthCont = useAuthContext();
  const contextToken = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  //Reset all online users
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
      const credentialModel = await authService.logout(
        contextToken.state.token
      );
      if (!credentialModel.isLoggedIn) {
        useAuthCont.dispatch(credentialModel);
        //Added the choose user in to state choose user store.
        dispatch(chooseUserReducer(payload));
        //Reset all online users
        reSetAllUsers();
        useAuthCont.dispatch(credentialModel);
        //Reset all online users
        reSetAllUsers();
      }
    }
    navigateTo("/");
  };
  return (
    <div className="BrandSelf container-fluid h-50 p-0 m-0">
      {useAuthCont.isLoggedIn ? (
        <Navbar
          className="nave-bar-header  container-fluid h-100 p-0 m-0"
          color="faded"
          light
        >
          <NavbarBrand className="me-auto h-25 p-0 m-0"></NavbarBrand>
          <NavbarToggler
            onClick={toggleNavbar}
            className="me-2 h-100 p-0 m-0"
          />
          <Collapse
            className="collapse-container h-100 p-0 m-0 bg-primary bg-light bg-gradient"
            isOpen={!collapsed}
            navbar
          >
            <Nav navbar className="navbar-container h-100 w-100 p-0 m-0">
              <NavItem className="nav-item-container">
                <Link className="class-link" to="/help-how-to-this-site">
                  Help
                </Link>
              </NavItem>
              <NavItem>
                <Link className="class-link" to="/contact-pane">
                  Back
                </Link>
              </NavItem>
              <NavItem>
                <Link className="class-link" to="/update-user">
                  Update
                </Link>
              </NavItem>
              <NavItem>
                <Link className="class-link" to="/delete-user">
                  Delete
                </Link>
              </NavItem>
              <NavItem>
                <Link className="class-link" onClick={LogOut} to="">
                  Log out
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar className="container-fluid  h-100 p-0 m-0" color="faded" light>
          <NavbarBrand href="/" className="me-auto h-25 p-0 m-0 "></NavbarBrand>
          <NavbarToggler
            onClick={toggleNavbar}
            className="me-2 h-100 p-0 m-0"
          />
          <Collapse className="h-100 p-0 m-0" isOpen={!collapsed} navbar>
            <Nav navbar className="h-100 w-100 p-0 m-0">
              <NavItem>
                <Link to="/help-how-to-this-site">Help</Link>
              </NavItem>
              <NavItem>
                <Link to="/">Login</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </div>
  );
}

export default BrandSelf;
