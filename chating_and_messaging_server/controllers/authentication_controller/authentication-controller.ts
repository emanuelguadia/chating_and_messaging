import express, { Request, Response } from "express";
import usersBusinessLogic from "../../business_logic/users_business_logic/users-business-logic";
import {
  generateValidToken,
  generateRefreshToken,
} from "../../middlewares/helper_functions/generate-token";
import bcrypt from "bcrypt";
import tokenBusinessLogic from "../../business_logic/token_business_logic/token-business-logic";
import { authenticateTokenBody } from "../../middlewares/auth_token_model_body/auth_token_model_body";
import { serverSocket } from "../../chat-server";
import { LoginModel } from "../../models/login_model/login-model";
import redisBusinessLogic from "../../business_logic/redis_business_logic/redis-business-logic";
const router = express.Router();
const Expiration_Time: number = Number(process.env.EXPIRATION_TIME) | 12;
//login
router.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    let loginModel: LoginModel = new LoginModel("", "", false, "no message");
    //@ts-ignore
    let user: UserModel;
    if (email && password) {
      //Check if user exists in db.
      user = await usersBusinessLogic.getOneUserWithUserName(email);
      if (!user) {
        loginModel.message = "Bad username & password combination";
        return response.status(401).json(loginModel);
      }
      const bcryptKey = user?.password;
      const isMatch = await bcrypt.compare(password, bcryptKey);
      if (isMatch) {
        //Means the user found and the password match.
        serverSocket.tempUser.userName = email as string;
        serverSocket.tempUser.password = password as string;
        serverSocket.tempUser.isLogIn = true;
        loginModel.userName = email;
        loginModel.isLoggedIn = true;
        loginModel.message = "user  logged in successfully!";
        //@ts-ignore
        user.isLoggedIn = true;
        const temPassword = user?.password;
        //Do this  user.password = "";  because do not want to response password to client from server.
        user.password = "";
        //The data to encode
        const payload = { loginModel: loginModel, user: user };
        //The access token
        const validToken = await generateValidToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        if (validToken && refreshToken) {
          //@ts-ignore
          response.json({
            accessValidToken: validToken,
            refreshToken: refreshToken,
          });
          //After  response continue to save validToken,refreshToken and update user in db.
          user.password = temPassword;
          await usersBusinessLogic.updateUser(user._id, user);
          await tokenBusinessLogic.saveValidToken(validToken);
          // await redisBusinessLogic.saveValidToken(
          //   email,
          //   validToken,
          //   Expiration_Time.toString()
          // );
          await tokenBusinessLogic.saveRefreshSecretKey(refreshToken);
          // await redisBusinessLogic.saveRefreshSecretKey(
          //   email,
          //   refreshToken,
          //   Expiration_Time.toString()
          // );
        } else {
          //The user pass auth successfully but the  server not generate
          //ValidToken or RefreshToken
          loginModel.userName = "";
          loginModel.isLoggedIn = false;
          loginModel.message = "user  logged in not successfully!";
          //@ts-ignore
          user.isLoggedIn = false;
          loginModel.message = "Something is wrong with the website's server";
          return response.status(500).json(loginModel);
        }
      } else {
        //Not Match
        loginModel.message = "Bad username & password combination";
        return response.status(401).json(loginModel);
      }
    } else {
      loginModel.message = "Bad username & password combination";
      return response.status(401).json(loginModel);
    }
  } catch (error: any) {}
});
//logout
router.post(
  "/logout",
  authenticateTokenBody,
  async (request: any, response: Response) => {
    try {
      const { payload, accessValidToken, refreshToken } = request.payload as {
        payload: any;
        accessValidToken: any;
        refreshToken: any;
      };
      const { loginModel, user } = payload;
      //For updating user
      const userFromDb = await usersBusinessLogic.getOneUser(user._id);
      if (userFromDb){
        loginModel.userName = "";
        loginModel.password = "";
        loginModel.isLoggedIn = false;
        loginModel.message = "user is logout";
        loginModel.token = undefined;
        response.json(loginModel);
        //After  response continue to update  user  and delete AccessToken,RefreshToken in db.
        userFromDb.isLoggedIn = false;
        userFromDb.socketId = undefined;
        user.socketId = "";
        await usersBusinessLogic.updateUser(userFromDb._id, userFromDb);
        await tokenBusinessLogic.deleteAccessToken(accessValidToken);
        //await redisBusinessLogic.deleteAccessToken(accessValidToken);
        await tokenBusinessLogic.deleteRefreshToken(refreshToken);
        //await redisBusinessLogic.deleteRefreshToken(refreshToken);
        return;
      } else {
        //Means user not found in db.
        return response.status(401).json({
          email: "",
          password: "",
          isLoggedIn: false,
          message: "",
          token: undefined,
        });
      }
    } catch (error) {
      return response.json(error);
    }
  }
);
export default router;
