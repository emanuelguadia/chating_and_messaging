import CredentialModel from "../../../models/login_model/logModel";
import "./Login.css";
import jwtDecode from "jwt-decode";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { authService } from "../../../services/authentication_service/auth-service";
import { useContext, useState } from "react";
import ContactPane from "../../home_page_area/contact_pane/ContactPane";
import {
  AuthContext,
  useAuthContext,
} from "../../../app_state_area/context/auth_provider_context/authProvider";
import UserModel from "../../../models/user_model/user-model";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux_hooks/redux-hooks";
import { profileUserReducer } from "../../../app_state_area/redux/profile_state/profile";
function Login(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CredentialModel>();
  const useAuthCont = useAuthContext();
  const dispatch = useAppDispatch();
  const { state } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  async function submit(credential: CredentialModel): Promise<void> {
    try {
      credential.message = "Want to login to system";
      credential.isLoggedIn = false;
      //Use authService to send credential object with axios api from client to sever.
      const token = await authService.login(credential);
      if (token) {
        const { accessValidToken } = token;
        const decodeAccValidToken: any = jwtDecode(accessValidToken);
        const { loginModel, user } = decodeAccValidToken;
        const signInUser: UserModel = user as UserModel;
        const credentialObject: CredentialModel = loginModel as CredentialModel;
        //Saving the token in credentialObject before saving to context.
        credentialObject.token = token;
        if(credentialObject?.isLoggedIn){
          //Adding the final result of logged in object  from server to context.
          useAuthCont.dispatch(credentialObject);
          dispatch(profileUserReducer({ profileUser: signInUser }));
        } else {
          setError("logged in is not success try later again");
        }
      }
    } catch (err: any) {
      setError("Error server authenticated!!!");
    }
  }
  return (
    <div className="Login container-fluid h-100 p-0 m-0">
      {state?.isLoggedIn ? (
        <ContactPane/>
      ) : (
        <Form onSubmit={handleSubmit(submit)} className="container w-50">
          <br />
          <FormGroup>
            <Label for="exampleEmail" hidden>
              Email
            </Label>
            <input
              aria-invalid={errors.email ? "true" : "false"}
              type="email"
              {...register("email", { required: "Email Address is required" })}
              className="form-control"
              id="inputPassword"
              placeholder=" Email"
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              className="form-control"
              id="inputPassword"
              placeholder="password"
            />
            {errors.password?.type === "required" && (
              <p role="alert">Password is required</p>
            )}
          </FormGroup>{" "}
          <Row>
            <Col>
              <Button>Sign in</Button>
            </Col>
            <Col>
              <Link to="/add-user">
                <Button>Sign up</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default Login;
