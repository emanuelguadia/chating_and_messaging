import { Button } from "reactstrap";
import "./ListOfUsers.css";
import { SyntheticEvent, useEffect, useState, useContext } from "react";
import UserModel from "../../../models/user_model/user-model";
import CredentialModel from "../../../models/login_model/logModel";
import { useAuthContext } from "../../../app_state_area/context/auth_provider_context/authProvider";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux_hooks/redux-hooks";
import { chooseUserReducer } from "../../../app_state_area/redux/users_state/choose-user-state";
interface ListOfUsersProps {
  takeingChooseUser?: (user: UserModel) => UserModel;
}
function ListOfUsers(props: ListOfUsersProps): JSX.Element {
  const dispatch = useAppDispatch();
  const allOnUsersState = useAppSelector((state) => {
    return state.userStateReducer.users;
  });
  const allOffLinsUsers = useAppSelector((state) => {
    return state.offLineUsersState.offUsers;
  });
  //all users online
  const [usersOnline, setUsersOnline] = useState<UserModel[]>([]);
  //all users offline
  const [usersOffline, setUsersOffline] = useState<UserModel[]>([]);
  //users auth context.
  const useAuthCont = useAuthContext();
  const [loggedIn, setLoggedIn] = useState<CredentialModel>({
    email: "",
    password: "",
    isLoggedIn: false,
    message: "",
    token: "",
  });
  //Sending choose user
  const sendingOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const userName: string = (event.target as HTMLButtonElement).value;
    const user: UserModel = allOnUsersState?.find(
      (user: UserModel) => user?.userName === userName
    ) as UserModel;
    if (user) {
      //Building choose user state before using chooseUserReducer.
      const payload = {
        activeChooseUser: user,
        status: true,
      };
      //Added the choose user in to state choose user store.
      dispatch(chooseUserReducer(payload));
      //Sending the choose user throw props to component ContactPane.
      if (props?.takeingChooseUser) {
        props.takeingChooseUser(user);
      }
    }
  };
  useEffect(() => {
    setUsersOnline(allOnUsersState);
    setUsersOffline(allOffLinsUsers);
  }, [allOnUsersState, allOffLinsUsers]);
  return (
    <div className="ListOfUsers container-fluid h-100 p-0 m-0">
      <div className="usersOnlineContainer container-fluid w-100 h-50 p-0 m-0">
        <div className="listOfUsers-map-container container-fluid h-75 p-0 m-0">
          <h6 className="on-line-users-header p-0 m-0 h-25">online users</h6>
          {usersOnline ? (
            usersOnline?.map((user: UserModel) => {
              //Image of post.
              let dataUrl;
              if (user) {
                const { imageOfPost } = user;
                if (imageOfPost) {
                  //const {type:Buffer, data: Array} =imageOfPost as any;
                  const {data } = imageOfPost as
                    | { type: any; data: any }
                    | any;
                  dataUrl = `data:image/*;base64,${btoa(
                    String.fromCharCode(...data?.data)
                  )}`;
                }
                return (
                  <div
                    className="onLine-user-card card mb-3 h-50 w-100 p-0 m-0"
                    key={user?._id}
                  >
                    <div className="onLine-user-row row g-0 h-100 w-100 p-0 m-0">
                      <div className="col-md-4 w-25 h-100 p-0 m-0">
                        <Button className="userNameBtn  h-100 w-100 p-0 m-0">
                          <img
                            className="img-fluid rounded-start h-100 w-100 p-0 m-0"
                            src={dataUrl}
                            alt="good"
                          />
                        </Button>
                      </div>
                      <div className="col-md-8  w-75 h-100 p-0 m-0">
                        <div className="card-body h-100 w-100 p-0 m-0">
                          <div className="card-text container-fluid h-100 w-100 p-0 m-0">
                            <Button
                              className="userNameBtn bg-info container-fluid h-100 w-100 p-0 m-0"
                              onClick={sendingOnClick}
                              value={user?.userName?.toString()}
                            >
                              <label className="card-title">
                                <b>First Name</b> {user?.firstName}
                              </label>
                              <label className="card-text">
                                <b>Last Name</b> {user?.lastName}
                              </label>
                              <label>
                                <br></br>
                                <b>To chat with user click here </b>
                              </label>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      {/*==================== ================================================================ */}
      <div className="usersOfflineContainer container-fluid w-100 h-50 p-0 m-0">
        <h6 className="off-line-users-header  p-0 m-0 h-25">offline users</h6>
        <div className="off-listOfUsers-map-container container-fluid h-75 p-0 m-0">
          {usersOffline ? (
            usersOffline?.map((user: UserModel) => {
              //Image of post.
              let dataUrl;
              if (user) {
                const { imageOfPost } = user;
                if (imageOfPost) {
                  //const {type:Buffer, data: Array} =imageOfPost as any;
                  const { data } = imageOfPost as
                    | { type: any; data: any }
                    | any;
                  dataUrl = `data:image/*;base64,${btoa(
                    String.fromCharCode(...data?.data)
                  )}`;
                }
                return (
                  <div
                    className="off-Line-user-card card mb-3 h-50 w-100 p-0 m-0"
                    key={user?._id}
                  >
                    <div className="off-line-user-row row g-0 h-100 w-100 p-0 m-0">
                      <div className="col-md-4 w-25 h-100 p-0 m-0">
                        <Button className="userNameBtn bg-info h-100 w-100 p-0 m-0">
                          <img
                            className="img-fluid rounded-start h-100 w-100 p-0 m-0"
                            src={dataUrl}
                            alt="good"
                          />
                        </Button>
                      </div>
                      <div className="col-md-8  w-75 h-100 p-0 m-0">
                        <div className="card-body h-100 w-100 p-0 m-0">
                          <div className="card-text container-fluid h-100 w-100 p-0 m-0">
                            <Button
                              className="userNameBtn bg-info container-fluid h-100 w-100 p-0 m-0 b-0"
                              onClick={sendingOnClick}
                              value={user?.userName?.toString()}
                            >
                              <label className="card-title">
                                <b>First Name</b> {user?.firstName}
                              </label>
                              <label className="card-text">
                                <b>Last Name</b> {user?.lastName}
                              </label>
                              <br></br>
                              <label className="bg-danger">Disconnect</label>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default ListOfUsers;
