import { AccessToken } from "../../models/tokens_model/access-valid-token";
import { RefreshToken } from "../../models/tokens_model/refresh-valid-token";
type MyAccessToken = InstanceType<typeof AccessToken>;
type MyRefreshToken = InstanceType<typeof RefreshToken>;
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
async function updateAccessValidToken(
  _id: string,
  accessToken: MyAccessToken
): Promise<any> {
  //Access token to update
  const updatedAccessToken = new AccessToken();
  updatedAccessToken._id = accessToken._id;
  updatedAccessToken.accessToken = accessToken.accessToken as string;
  return await AccessToken.updateOne(
    {
      _id: accessToken._id,
    },
    updatedAccessToken
  );
}
async function updateRefreshToken(refreshToken: MyRefreshToken): Promise<any> {
  //Access token to update
  const updatedRefreshToken = new RefreshToken();
  updatedRefreshToken._id = refreshToken._id;
  updatedRefreshToken.refreshToken = refreshToken.refreshToken as string;
  return await RefreshToken.updateOne(
    {
      _id: refreshToken._id,
    },
    updatedRefreshToken
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
  saveValidToken,
  saveRefreshSecretKey,
  updateAccessValidToken,
  updateRefreshToken,
  deleteAccessToken,
  deleteRefreshToken,
};
