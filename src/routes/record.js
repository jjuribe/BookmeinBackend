const express = require("express");
//const mongoose = require("mongoose");
const dbo = require('../db/conn');
const { User } = require("../models/user");





const recordRoutes = express.Router();

// Require Record model in our routes module


const users = require("../models/user");   
  

//get all users
recordRoutes.route("/users").get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
  });

  //post a new user
// post new user json


  recordRoutes.route("/users").post(async function (req, res, next) {
    
    // new user of User model
    const dbConnect = dbo.getDb();
    let user = new User();

    user.username= req.body.username;
    user.password= req.body.password;
    user.roles= req.body.roles;
      //password: req.body.password,
      //roles: req.body.roles,
    
    console.log(req.body);  
    console.log(user); 

    dbConnect.collection("users").insertOne(user, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting user!");
        console.log(err);
        
      } else {
        res.json(result);
      }
      
    });
  });




// Delete a user

recordRoutes.route("/users/:id").delete(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  dbConnect.collection("users").deleteOne({ _id: id }, function (err, result) {
    if (err) {
      res.status(400).send("Error deleting user!");
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

////login

recordRoutes.route("/login").post(async function (req, res) {
  
  const dbConnect = dbo.getDb();
  let user = new User();

  user.username= req.body.username;
  user.password= req.body.password;
    
  
  console.log(req.body);  
  console.log(user); 

  dbConnect
    .collection("users")
    .findOne(
      { username: user.username, password: user.password },
      function (err, result) {
        if ((err) || (result == null) ) {
           console.log(err);
          console.log("user or password not found");
          res.status(400).send("Error logging in!");
          
          
        } else {
          
          res.json(result );
          console.log("User: " +user.username +" logged in")
          
        }
      }
    );
});



  module.exports = recordRoutes;