import express, { Request, Response } from "express";
import usersBusinessLogic from "./../../business_logic/users_business_logic/users-business-logic";
import { UserModel } from "../../models/user_schema/user-schema";
import bcrypt from "bcrypt";
import { authenticateTokenBody } from "../../middlewares/auth_token_model_body/auth_token_model_body";
const emailValidator = require("deep-email-validator");
//to Verify an Email Address use this function
async function isEmailValid(email: any) {
  return emailValidator.validate(email);
}
const router = express.Router();
router.post(
  "/allUsers",
  authenticateTokenBody,
  async (request: any, response: Response) => {
    try {
      const values = await usersBusinessLogic.getAllUsers();
      if (values) {
        return response.json(values);
      }
    } catch (err) {
      return response.json("The source is not found 404!");
    }
  }
);
router.get("/:_id", async (request: Request, response: Response) => {
  const _id = request.params._id;
  const user = await usersBusinessLogic.getOneUser(_id);
  try {
    if (user) {
      response.json(user);
    }
  } catch (err) {
    response.json("The source is not found 404!");
  }
});
router.post("/", async (request: Request, response: Response) => {
  try {
    const COUNT_BCRYPT_HASH = 8;
    //@ts-ignore
    const user: UserModel = new UserModel(request.body);
    //Means there no content in the body.
    if (!user) {
      return response.status(400).json("Bad request");
    }
    //Email Validator by using this  command
    const email = user.userName;
    const { valid, reason, validators } = await isEmailValid(email);
    const { regex, typo, disposable, mx, smtp } = validators;
    if (
      valid &&
      regex.valid &&
      typo.valid &&
      disposable.valid &&
      mx.valid &&
      smtp.valid
    ) {
      //Check if user all ready exit in db.
      let checkUser;
      if (user?.userName) {
        checkUser = await UserModel.findOne({
          userName: user.userName,
        });
      }
      //Means user all ready added so not added again  user with the same userName.
      if (checkUser) {
        return response.status(401).json("not operating this action");
      }
      //Means user not exist so it is possible save the user to db.
      //But before saving the user checking the if  exist file
      if (request?.files) {
        const files = request.files;
        user.imageOfPost = files?.imageOfPost;
      }
      //Hashing the Password.
      const bcryptHashPassword = await bcrypt.hash(
        user.password,
        COUNT_BCRYPT_HASH
      );
      user.password = bcryptHashPassword;
      const addedUser = await usersBusinessLogic.AddUser(user);
      //Do this  user.password = "";  because do not want to response password to client from server.
      if (addedUser) {
        addedUser.password = "";
        addedUser.isLoggedIn = false;
        return response.json(addedUser);
      } else {
        return response.json("null");
      }
    } else {
      return response.json({
        message: "Please provide a valid email address.",
        reason: "valid status is false"
      })
    }
  } catch (error: any) {
    return response.json(error.message);
  }
});
router.put("/:_id", async (request: Request, response: Response) => {
  try {
    const _id = request.params._id;
    const user = new UserModel(request.body);
    //Before updating the user checking the if  exist file
    if (request?.files) {
      const files = request.files;
      user.imageOfPost = files?.imageOfPost as any;
    }
    //Hashing the Password.
    // const bcryptHashPassword = await bcrypt.hash(
    //   user.password,
    //   COUNT_BCRYPT_HASH
    // );
    // user.password = bcryptHashPassword;
    const updatedUser = await await usersBusinessLogic.updateUser(_id, user);
    response.json(updatedUser);
  } catch (err) {}
});
router.patch("/:_id", async (request: Request, response: Response) => {
  try {
    const _id = request.params._id;
    const user = new UserModel(request.body);
    //Before updating the user checking the if  exist file
    if (request?.files) {
      const files = request.files;
      user.imageOfPost = files?.imageOfPost as any;
    }
    const updatedUser = await await usersBusinessLogic.updateUser(_id, user);
    response.json(updatedUser);
  } catch (err) {}
});
router.delete("/:_id", async (request: Request, response: Response) => {
  try {
    const _id = request.params._id;
    await usersBusinessLogic.deleteUser(_id);
    response.json(204);
  } catch (err) {}
});
export default router;
