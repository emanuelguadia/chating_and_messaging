import { Schema, model} from "mongoose";
const tokenSchema = new Schema({
  accessToken: { type: String, required: true },
});
export const AccessToken = model(
  "AccessToken",
  tokenSchema,
  "access-tokens"
);
