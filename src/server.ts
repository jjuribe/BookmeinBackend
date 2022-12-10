import  express from "express";
import  cors from "cors";
import jwt from "jsonwebtoken";

import { sample_users } from "./data";//temporary data to test without mongodb server
//


let app = express();
app.use(cors());
app.options('*', cors());
//



app.use(express.json());//enable json body parsing
//localhost:4200

const mongoose = require("mongoose");
const dbo = require('./db/conn');


//routes

app.use(require('./routes/record'));

app.use(cors(
    {
        credentials: true,
        origin: ["http://localhost:4200"]
    }
));

//api's
//login api
app.post("/api/users/login",(req,res)=>{
  
  const {email,password} = req.body;
  const user =
    sample_users.find((u) => u.email === email &&
    u.password === password);

    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send({message: "Invalid email or password"});
    }

    
})

const generateTokenResponse = (user: any) => {
const token = jwt.sign({
  email: user.email,
  isAdmin: user.isAdmin},
  "secret",
  {expiresIn: "30d"}
  );

  user.token = token;
  return user;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api definition
app.get("/api", (req, res) => {
    res.send("Hello World");
})

//api to get all users

app.get("/api/users", (req, res) => {
    res.send(sample_users);
})

///connect to mongodb

// Global error handling

  // perform a database connection when the server starts
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


// //server start
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log("Website served on localhost:" +port);
// })
