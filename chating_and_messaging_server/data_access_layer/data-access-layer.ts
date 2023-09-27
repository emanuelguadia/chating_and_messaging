const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URI;
require("dotenv").config();
const funcConnectDB = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err: any) => {
      console.log(err.message);
    });
};
export default funcConnectDB;
