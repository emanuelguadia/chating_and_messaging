import { createClient } from "redis";
const client = createClient({
  url: `redis://localhost:6379`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
let isConnected: (value?:unknown) => void;
const promise = new Promise((resolve,reject) => {
  isConnected = resolve;
});
async function connect(){
  await client.connect();
 isConnected()
}
connect();
export async function getRedisDbClient(){
  await promise;
  return client;
}
