const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();
export const authenticateToken = (
  req: any & { user: any },
  res: any,
  next: any
) => {
  // let temp = JSON.stringify(req);
  // let temp1 = JSON.stringify(req?.headers);
  // let temp2 = JSON.stringify(req?.headers?.authorization);
  const token = req?.headers?.authorization?.split("Bearer ")[1] as {
    accessValidToken: any;
    refreshToken: any;
  };
  if (token === null) {
    return req.sendStatus(401);
  }
  if (!token) {
    return res.status(403).json("null");
  }
  const { accessValidToken, refreshToken } = token;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(accessValidToken, secret, (error: any, payload: any) => {
    if (error) {
      return req.sendStatus(401);
    }
    req.payload = payload;
    return next();
  });
};
