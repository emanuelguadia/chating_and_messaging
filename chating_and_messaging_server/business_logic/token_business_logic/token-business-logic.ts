import { AccessToken } from "../../models/tokens_model/access-valid-token";
import { RefreshToken } from "../../models/tokens_model/refresh-valid-token";
type MyAccessToken = InstanceType<typeof AccessToken>;
type MyRefreshToken = InstanceType<typeof RefreshToken>;
async function getValidToken(accessValidToken: string): Promise<any> {
  const accessValidTokenDb = await AccessToken.findOne({
    accessValidToken:accessValidToken,
  });
  if (!accessValidTokenDb) {
    return null;
  }
  return accessValidTokenDb;
}
async function getRefreshSecretKey(_id:string): Promise<any> {
  let refreshTokenFromDb = await RefreshToken.findOne({
    _id:_id,
  });
  if (!refreshTokenFromDb) {
    return null;
  }
  return refreshTokenFromDb;
};
async function saveValidToken(accessValidToken: any): Promise<any> {
  const acc_token = new AccessToken();
  acc_token.accessToken = accessValidToken;
  return await acc_token.save();
}
async function saveRefreshSecretKey(refreshSecretKey: any): Promise<any> {
  const ref_token = new RefreshToken();
  ref_token.refreshToken = refreshSecretKey;
  return await ref_token.save();
}
async function updateAccessValidToken(_id:string,newAccessToken:string): Promise<any> {
  //Access token to update
  const updatedAccessToken = new AccessToken();
  updatedAccessToken.accessToken = newAccessToken;
  return await AccessToken.updateOne(
    {
      _id:_id,
    },
    updatedAccessToken
  );
}

async function deleteAccessToken(accessToken: any):Promise<any> {
  return await AccessToken.deleteOne({
    accessToken: accessToken,
  });
}
async function deleteRefreshToken(refreshToken: any): Promise<any> {
  return await RefreshToken.deleteOne({
    refreshToken: refreshToken,
  });
}
export = {
  getValidToken,
  getRefreshSecretKey,
  saveValidToken,
  saveRefreshSecretKey,
  updateAccessValidToken,
  deleteAccessToken,
  deleteRefreshToken,
};
