import express, { Response } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { generateValidToken } from "../../middlewares/helper_functions/generate-token";
import tokenBusinessLogic from "../../business_logic/token_business_logic/token-business-logic";
import redisBusinessLogic from "../../business_logic/redis_business_logic/redis-business-logic";
dotenv.config();
const router = express.Router();
const Expiration_Time: number = Number(process.env.EXPIRATION_TIME) | 12;
router.post("/", async (request: any, response: Response) => {
  const { accessValidToken, refreshToken } = request.body.token;
  if (!refreshToken || !accessValidToken) {
    response.status(401).send("bad request");
  }
  // the secret key
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
  //verify with accessValidToken
  jwt.verify(accessValidToken, ACCESS_TOKEN, async (err: any, payload: any) => {
    if (err) {
      response.status(401).json("bad request");
    }
    const accessToken = accessValidToken;
    // the secret key
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
    //Continuing the verify with refreshToken
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN,
      async (err: any, payload: any) => {
        if (err) {
          response.status(401).json("bad request");
        }
        let validTokenFromDb = await tokenBusinessLogic.getValidToken(
          accessToken
        );
        if (!validTokenFromDb) {
          response.status(401).json("bad request");
        }
      if (accessValidToken && refreshToken) {
        //Generate new valid token.
        const newAccessValidToken = generateValidToken(payload);
        //@ts-ignore
        response.json({
          accessValidToken: newAccessValidToken,
          refreshToken: refreshToken,
        });
        //After  response continue to update validToken in db and redis.
        await tokenBusinessLogic.updateAccessValidToken(
          validTokenFromDb._id as string,
          newAccessValidToken.toString()
        );
        const {loginModel,user} = payload as {
          loginModel:any,
          user: any
        }; 
        // await redisBusinessLogic.updateAccessValidToken(
        //   user.userName,
        //   Expiration_Time,
        //   newAccessValidToken.toString()
        // );
      }
      }
    );
  });
});
export default router;
