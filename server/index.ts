"use strict";
const express = require("express");
const cors = require("cors")();
const router = require("./router");
const db = require("./models/index");
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const app = express();

app.use(cors).use(express.json()).use(router);

(async () => {
  try {
    await db.sequelize.sync();
    console.log("connected to the db");
    app.listen(PORT, (err: any) => {
      if (err) {
        console.error("err: ", err);
      }
      console.log(`Server running in port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();

export {};
