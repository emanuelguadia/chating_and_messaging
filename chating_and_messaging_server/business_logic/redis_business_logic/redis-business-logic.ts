import express, { Response } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { generateToken } from "../../middlewares/helper_functions/generate-token";
import { AccessToken } from "../../models/tokens_model/access-valid-token";
import { RefreshToken } from "../../models/tokens_model/refresh-valid-token";
import { getRedisDbClient } from "../../data_access_layer/redis-data-access-layer";
import { RedisClientType } from "redis";
type MyAccessToken = InstanceType<typeof AccessToken>;
type MyRefreshToken = InstanceType<typeof RefreshToken>;
dotenv.config();
const router = express.Router();
async function startingRedisDbClient() {
  return await getRedisDbClient();
}
const client = startingRedisDbClient();
async function getRedisValue(key: string): Promise<any> {
  //email==key
  return (await client).get(key);
}
//save valid token in redis
async function saveValidToken(
  key: any,
  exTime: number,
  accessValidToken:string
): Promise<any> {
  return (await client).setEx(key, exTime, accessValidToken);
}
async function saveRefreshSecretKey(
  key: any,
  exTime: number,
  refreshSecretKey: string
): Promise<any> {
  return (await client).setEx(key, exTime, refreshSecretKey);
}
async function updateAccessValidToken(
  key:string,
  exTime: number,
  accessValidToken: string
): Promise<any> {
  return;
}
async function updateRefreshToken(
  key: any,
  exTime: number,
  accessValidToken: string
): Promise<any> {}
async function deleteAccessToken(
  key: any,
  exTime: number,
  accessValidToken: string
): Promise<any> {}
async function deleteRefreshToken(
  key: any,
  exTime: number,
  accessValidToken: string
): Promise<any> {}
export = {
  saveValidToken,
  saveRefreshSecretKey,
  updateAccessValidToken,
  updateRefreshToken,
  deleteAccessToken,
  deleteRefreshToken,
};
