import axios from "axios";
import UserModel from "./../../models/user_model/user-model";
import config from "../config_url/config";
const users_url = process.env.USERS_URL;
class UserService {
  public async allUsers(token: any): Promise<any> {
    try {
      const response = await axios.post<UserModel[]>(
        `${config.userUrl}/allUsers`,
        token,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (err) {
      return err;
    }
    return null;
  }
  public async getOneUser(_id: string): Promise<UserModel> {
    const response = await axios.get(`${config.userUrl}/:${_id}`);
    const getUser: UserModel = response.data;
    return getUser;
  }
  public async addUser(user: UserModel): Promise<UserModel> {
    const response = await axios.post<UserModel>(`${config.userUrl}`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const getUser: UserModel = response.data;
    return getUser;
  }
  public async fullUpdateUser(
    _id: string,
    user: UserModel
  ): Promise<UserModel> {
    const response = await axios.put(
      `${config.userUrl}/users/put/${_id}`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const getUser: UserModel = response.data;
    return getUser;
  }
  public async partialUpdateUser(
    _id: string,
    user: UserModel
  ): Promise<UserModel> {
    const response = await axios.patch(
      `${users_url}/users/patch/${_id}`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const getUser: UserModel = response.data;
    return getUser;
  }
  public async deleteUser(_id: any): Promise<any> {
    const response = await axios.delete(
      `${config.userUrl}/users/delete/${_id}`
    );
    const info = response.data;
    return info;
  }
}
export const userService = new UserService();
