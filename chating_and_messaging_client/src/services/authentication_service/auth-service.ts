import axios from "axios";
import CredentialModel from "../../models/login_model/logModel";
import UserModel from "../../models/user_model/user-model";
import config from "../config_url/config";
class AuthService {
  //login
  public async login(credential: CredentialModel): Promise<any> {
    try {
      const response = await axios.post(
        `${config.authenticationsUrl}/login`,
        credential
      );
      const { data } = response;
      return data;
    } catch (err: any) {
      return err.message;
    }
  }
  //Logout
  public async logout(token: any): Promise<CredentialModel> {
    try {
      const response = await axios.post(
        `${config.authenticationsUrl}/logout`,
        token,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = response;
      return data;
    } catch (err: any) {
      return err.message;
    }
  }
  //Logout with disconnected user
  public async logoutWithDisconnectedUser(
    disconnectedUser: UserModel
  ): Promise<CredentialModel> {
    try {
      const response = await axios.post(
        `${config.authenticationsUrl}/disconnected-user`,
        disconnectedUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = response;
      return data;
    } catch (err: any) {
      return err.message;
    }
  }
}
export const authService = new AuthService();
