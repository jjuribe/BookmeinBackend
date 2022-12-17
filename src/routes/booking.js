const { Booking } = require("../models/booking"); // Booking model

const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();

// Get all bookings
recordRoutes.route("/bookings").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("bookings")
    .find({})
    .limit(150)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// post a new booking
recordRoutes.route("/bookings").post(async function (req, res) {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  // to generate a random string of 5 characters // confirmation code
  let code = "";
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  // new booking of Booking model
  const dbConnect = dbo.getDb();
  let booking = new Booking();
  booking.startDate = req.body.startDate;
  booking.endDate = req.body.endDate;
  booking.status = req.body.status;
  booking.confirmationCode = code;
  booking.notes = req.body.notes;
  booking.dateCreated = new Date();
  booking.dateLastModified = booking.dateCreated;
  booking.userId = req.body.userId;
  booking.organisationId = req.body.organisationId;

  console.log(req.body); //for testing
  console.log(booking); //for testing
  dbConnect.collection("bookings").insertOne(booking, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting booking!");
      console.log(err);
      console.log("Error inserting booking!");
    } else {
      res.json(result);
      console.log("Booking added");
    }
  });
});

// Get a booking by BookingId
recordRoutes.route("/bookings/:id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  dbConnect
    .collection("bookings")
    .find({
      _id: id,
    })
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching booking!");
        console.log(err);
      } else {
        res.json(result);
        console.log("Booking fetched");
      }
    });
});

// Booking update
recordRoutes.route("/bookings/:id").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const booking = req.body;
  const query = { _id: id };
  const updateDoc = {
    $set: {
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        status: req.body.status,
        confirmationCode : code,
        notes : req.body.notes,
        dateLastModified : Date().now(),
        userId : req.body.userId,
        organisationId : req.body.organisationId
    },
  };
  dbConnect
    .collection("bookings")
    .update.one(query, updateDoc, function (err, result) {
      if (err) {
        res.status(400).send("Error updating booking!");
        console.log(err);
        console.log("Error updating booking!");
      } else {
        res.json(result);
        console.log("Booking updated Successfully");
      }
    });
});

// Delete a booking
recordRoutes.route("/bookings/:id").delete(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const query = { _id: id };
  dbConnect.collection("bookings").deleteOne(query, function (err, result) {
    if (err) {
      res.status(400).send("Error deleting booking! ", id);
      console.log(err);
      console.log("Error deleting booking! ", id);
    } else {
      res.json(result);
      console.log("Booking deleted Successfully", id);
    }
  });
});

//Get all bookings by UserId
recordRoutes.route("/bookings/user/:id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  dbConnect
    .collection("bookings")
    .find({
      _id: id,
    })
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching booking!");
        console.log(err);
      } else {
        res.json(result);
        console.log("Booking fetched");
      }
    });
});

// Get all bookings by Service Provider Id
recordRoutes
  .route("/bookings/serviceprovider/:id")
  .get(async function (req, res) {
    const dbConnect = dbo.getDb();
    const id = req.params.id;
    dbConnect
      .collection("bookings")
      .find({
        serviceProviderId: id,
      })
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching booking!");
          console.log(err);
        } else {
          res.json(result);
          console.log("Booking fetched");
        }
      });
  });

module.exports = recordRoutes;
