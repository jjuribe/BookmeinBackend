import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { sample_users } from "./data"; //temporary data to test without mongodb server

const mongoose = require("mongoose");
const dbo = require("./db/conn");

let app = express();
app.use(express.json()); // Enable json body parsing
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

//routes
app.use(require("./routes/record"));

// test get call
app.get("/api", (req, res) => {
  res.send("Hello World");
});

// Connect to mongoDB and Start server
dbo.connectToServer(function (err: any) {
  if (err) {
    console.error(err);
    //process.exit();
  }
  const port = process.env.PORT || 3000;
  // start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
