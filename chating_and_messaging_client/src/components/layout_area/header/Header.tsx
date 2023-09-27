import { Col, Row } from "reactstrap";
import "./Header.css";
import BrandSelf from "../BrandSelf/BrandSelf";
import MenuBarLargerScreens from "../MenuBarLargerScreens/MenuBarLargerScreens";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../app_state_area/context/auth_provider_context/authProvider";
import UsersDetail from "../../users_area/UsersDetail/UsersDetail";
import { useAppSelector } from "../../../hooks/redux_hooks/redux-hooks";
function Header(): JSX.Element {
  const { state } = useContext(AuthContext);
  //Choose user statues from  redux
  const chooseUserStatus = useAppSelector((state) => {
    return state.chooseUserState.status;
  });
  useEffect(() => {
    console.log(chooseUserStatus);
  }, [chooseUserStatus]);
  return (
    <div className="Header container-fluid h-100 p-0 m-0">
      <Row className="container-fluid h-100 p-0 m-0 ">
        <Col className="border h-100 p-0 m-0">
          <div className="border h-100 w-100 p-0 m-0 container-fluid">
            {chooseUserStatus ? <UsersDetail></UsersDetail> : <></>}
          </div>
        </Col>
        {state.isLoggedIn ? (
          <></>
        ) : (
          <Col className="border h-100 p-0 m-0">
            <h4>Welcome</h4>
          </Col>
        )}
        <Col className=" border h-100 p-0 m-0">
          <BrandSelf />
          <MenuBarLargerScreens />
        </Col>
      </Row>
    </div>
  );
}
export default Header;
