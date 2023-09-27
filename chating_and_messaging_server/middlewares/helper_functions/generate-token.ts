const jwt = require("jsonwebtoken");
const Expiration_Time: number = Number(process.env.EXPIRATION_TIME) | 12;
export const generateToken = async (payload: any) => {
  if (payload) {
    //The secret key
    const secret = process.env.ACCESS_TOKEN_SECRET;
    //The options
    const options = { expiresIn: `${Expiration_Time}h`, algorithm: "HS256" };
    //The token
    const newValidToken = await jwt.sign(payload, secret, options);
    if (newValidToken) {
      return newValidToken;
    } else {
      return null;
    }
  }
};
