import {
  useState,
  createContext,
  useLayoutEffect,
  useCallback,
  useContext,
  Dispatch,
} from "react";
import { AxiosResponse } from "axios";
import apiClient from "./../auth_provider_context/authProvider";
import { useNavigate } from "react-router-dom";
import CredentialModel from "../../../models/login_model/logModel";
import axiosClient from "../../../services/axios_client_service/axios-client-service";
import { useAppDispatch } from "../../../hooks/redux_hooks/redux-hooks";
export const AuthContext = createContext<{
  state: CredentialModel;
  dispatch: Dispatch<CredentialModel>;
}>({
  state: {
    isLoggedIn: false,
    email: "",
    password: "",
    message: "",
    token: "",
  },
  dispatch: () => undefined,
});
const getDefaultAuthState = () => {
  return {
    isLoggedIn: false,
    email: "",
    password: "",
    message: "",
    token: "",
  };
};
const AuthHelper = function ({
  children,
  authState,
  setAuthState,
}: {
  children: any;
  authState: CredentialModel;
  setAuthState: (newState: CredentialModel) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const useAuthCont = useAuthContext();
  const logout = useCallback(() => {
    setAuthState({
      ...authState,
      isLoggedIn: false,
    });
    navigate("/");
  }, [authState]);
  useLayoutEffect(() => {
    const responseInterceptor = axiosClient.interceptors?.response?.use(
      (res: any) => res,
      (error: Error & { response: AxiosResponse }) => {
        if (error?.response?.status === 401) {
          if (useAuthCont?.token) {
            const token = useAuthCont.token;
            if (token) {
              //  const response = axiosClient.post("http://localhost:4000/token", {
              //    token,
              //  });
              //  const responseToken = response?.data;
              //  const { accessValidToken, refreshToken } = responseToken;
              //  const finalResult: any = jwtDecode(accessValidToken);
              //  const { loginModel, user } = finalResult;
              //  const signInUser: UserModel = user as UserModel;
              //  const credentialObject: CredentialModel =
              //    loginModel as CredentialModel;
              //  credentialObject.token = responseToken;
              //  if (credentialObject?.isLoggedIn) {
              //    //Adding the final result of logged in object  from server to context.
              //    useAuthCont.dispatch(credentialObject);
              //    //?????dispatch(chooseUserReducer({activeChooseUser:signInUser,status:true}));
              //  }
            } else {
              //logout();
            }
          }
        } else {
          //logout();
        }
      }
    );
    // request interceptor
    //@ts-ignore
    const requestInterceptor = axiosClient.interceptors?.request?.use(
      (request: any) => {
        if (useAuthCont?.token) {
          // const token = useAuthCont?.token;
          // console.log(
          //   "const requestInterceptor = axiosClient.interceptors?.request?.use.....>"
          // );
          // console.log(useAuthCont.token);
          // request.headers.Authorization = "Bearer " + token;
          // console.log("request.headers.Authorization = Bearer  + token;");
          // console.log(request.headers.Authorization);
        }
        return request;
      },
      (error: Error) => error
    );
    return () => {
      //@ts-ignore
      apiClient.interceptors?.response?.eject(responseInterceptor);
      //@ts-ignore
      apiClient.interceptors?.request?.eject(requestInterceptor);
    };
  }, [authState]);
  return <>{children}</>;
};
const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState<CredentialModel>(
    getDefaultAuthState()
  );
  return (
    //@ts-ignore
    <AuthContext.Provider value={{ state: authState, dispatch: setAuthState }}>
      {/*@ts-ignore */}
      <AuthHelper authState={authState} setAuthState={setAuthState}>
        {children}
      </AuthHelper>
    </AuthContext.Provider>
  );
};
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within App");
  }
  const { state, dispatch } = context;
  return {
    ...state,
    dispatch: (renewObject: Partial<CredentialModel>) => {
      dispatch({ ...state, ...renewObject });
    },
  };
};
export { useAuthContext };
export default AuthProvider;
