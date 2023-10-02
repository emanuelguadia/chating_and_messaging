const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();
export const authenticateTokenBody = (
  req: any & { user: any },
  res: any,
  next: any
) => {
  const token = req.body as {
    accessValidToken: any;
    refreshToken: any;
  };
  if(!token) {
    return res.status(401).json("null");
  }
  const { accessValidToken, refreshToken } = token;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(accessValidToken, secret, (error: any, payload: any) => {
    if (error) {
      return res.sendStatus(401);
    }
    const payloadData = {
      payload: payload,
      accessValidToken: accessValidToken,
      refreshToken: refreshToken,
    };
    req.payload = payloadData;
    next();
  });
};
