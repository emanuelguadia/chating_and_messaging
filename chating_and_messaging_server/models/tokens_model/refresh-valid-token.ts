import { Schema, model} from "mongoose";
const tokenSchema = new Schema({
  refreshToken: { type: String, required: true },
});
export const RefreshToken = model(
  "RefreshToken",
  tokenSchema,
  "refresh-tokens"
);
