import express, {Response} from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { generateToken } from "../../middlewares/helper_functions/generate-token";
import { AccessToken } from "../../models/tokens_model/access-valid-token";
import { RefreshToken } from "../../models/tokens_model/refresh-valid-token";
dotenv.config();
const router = express.Router();
const Expiration_Time: number = Number(process.env.EXPIRATION_TIME) | 12;
router.post("/token", async (request: any, response: Response) => {
  const { accessValidToken, refreshToken } = request.body.token;
  if (!refreshToken || !accessValidToken) {
    response.status(401).send("bad request");
  }
  // the secret key
  const secret = process.env.ACCESS_TOKEN_SECRET;
  //verify with accessValidToken
  jwt.verify(
    accessValidToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, payload: any) => {
      if (err) {
        response.status(401).json("bad request");
      }
      //Continuing the verify with refreshToken
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        async (err: any, payload: any) => {
          if (err) {
            response.status(401).json("bad request");
          }
          let refreshTokenFromDb = await RefreshToken.findOne({
            refreshToken: refreshToken,
          });
          if (!refreshTokenFromDb) {
            response.status(401).json("bad request");
          }
          const accessValidTokenDb = await AccessToken.findOne({
            accessToken: accessValidToken,
          });
          if (accessValidTokenDb){
            const newAccessValidToken = generateToken(payload);
            //Before response new valid token update the old accessValidToken.
            const accessValidToken = await AccessToken.updateOne(
              { _id: accessValidTokenDb._id },
              newAccessValidToken
            );
            //Response new generate token.
            return response.json({
              accessValidToken: newAccessValidToken,
              refreshToken: refreshToken,
            });
          }
          return response.status(401).json("bad request");
        }
      );
    }
  );
});
export default router;
