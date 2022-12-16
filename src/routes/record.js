const express = require("express");
//const mongoose = require("mongoose");
const dbo = require("../db/conn");
const { User } = require("../models/user"); // User model
const { Ticket } = require("../models/ticket"); // Ticket model
const { Organization } = require("../models/organization"); // Organization model
const { Booking } = require("../models/booking"); // Booking model
const { TimeSlot } = require("../models/timeslot"); // TimeSlot model

const recordRoutes = express.Router();
const users = require("../models/user");
const tickets = require("../models/ticket");
const organizations = require("../models/organization");
const bookings = require("../models/booking");
const timeslots = require("../models/timeslot");

// get all users
recordRoutes.route("/users").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("users")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// post a new user
recordRoutes.route("/users").post(async function (req, res) {
  // new user of User model
  const dbConnect = dbo.getDb();
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.roles = req.body.roles;
  user.email = req.body.email;

  console.log(req.body);
  console.log(user);
  //check if user already exists// Restricting duplicate user
  dbConnect.collection("users").findOne(
    {
      username: user.username,
    },
    function (err, result) {
      if (err) {
        res.status(400).send("Error fetching User!");
        console.log(err);
      } else {
        if (result == null) {
          dbConnect.collection("users").insertOne(user, function (err, result) {
            if (err) {
              res.status(400).send("Error inserting user!");
              console.log(err);
            } else {
              res.json(result);
            }
          });
        } else {
          res.status(400).send("User already exists!");
          console.log(result);
        }
      }
    }
  );
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

// login a user
recordRoutes.route("/login").post(async function (req, res) {
  console.log("login in router");
  const dbConnect = dbo.getDb();
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  dbConnect
    .collection("users")
    .findOne(
      { username: user.username, password: user.password },
      function (err, result) {
        console.log("Login in server.ts");

        if (err || result == null) {
          console.log(err);
          console.log("user or password not found");
          res.status(400).send("Error logging in!");
        } else {
          res.json(result);
          console.log("User: " + user.username + " logged in");
        }
      }
    );
});

//update a user
recordRoutes.route("/users/:id").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.roles = req.body.roles;
  user.email = req.body.email;
  dbConnect
    .collection("users")
    .update({ _id: id }, { $set: user }, function (err, result) {
      if (err) {
        res.status(400).send("Error updating user!");
        console.log(err);
      } else {
        console.log("user not updated");
        res.json(result);
        console.log("User: " + user.username + " updated");
      }
    });
});

/// get all tickets
recordRoutes.route("/tickets").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("tickets")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// post a new ticket
recordRoutes.route("/tickets").post(async function (req, res) {
  // new ticket of Ticket model
  const dbConnect = dbo.getDb();
  let ticket = new Ticket();
  ticket.CaseId = req.body.CaseId;
  ticket.CustomerId = req.body.CustomerId;
  ticket.Problem = req.body.Problem;
  if (req.body.Solution == "") {
    ticket.Solution = "Not yet solved";
  } else {
    ticket.Solution = req.body.Solution;
  }
  ticket.Status = req.body.Status;
  ticket.DateOpened = req.body.DateOpened;
  ticket.DateClosed = req.body.DateClosed;
  console.log(req.body); //for testing
  console.log(ticket); //for testing
  dbConnect.collection("tickets").insertOne(ticket, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting ticket!");
      console.log(err);
    } else {
      res.json(result);
      console.log("Ticket added");
    }
  });
});

// Get a ticket by CustomerId
recordRoutes.route("/tickets/:customerid").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const customerid = req.params.customerid;
  dbConnect
    .collection("tickets")
    .find({ CustomerId: customerid })
    .limit(50)

    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// Ticket update
recordRoutes.route("/tickets/:id").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const ticket = req.body;
  const query = { _id: id };
  const updateDoc = {
    $set: {
      CaseId: ticket.CaseId,
      CustomerId: ticket.CustomerId,
      Problem: ticket.Problem,
      Solution: ticket.Solution,
      Status: ticket.Status,
      DateOpened: ticket.DateOpened,
      DateClosed: ticket.DateClosed,
    },
  };
  dbConnect
    .collection("tickets")
    .updateOne(query, updateDoc, function (err, result) {
      if (err) {
        res.status(400).send("Error updating ticket!");
        console.log(err);
      } else {
        res.json(result);
        console.log("Ticket updated Successfully");
      }
    });
});

// Delete a ticket
recordRoutes.route("/tickets/:id").delete(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  dbConnect
    .collection("tickets")
    .deleteOne({ _id: id }, function (err, result) {
      if (err) {
        res.status(400).send("Error deleting ticket!");
        console.log(err);
      } else {
        res.json(result);
      }
    });
});



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
  //to generate a random string of 5 characters // confirmation code
  let code = "";
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  // new booking of Booking model
  const dbConnect = dbo.getDb();
  let booking = new Booking();
  booking.BookingId = req.body.BookingId;
  booking.BookingDate = req.body.BookingDate;
  booking.BookingTime = req.body.BookingTime;
  booking.Status = req.body.Status;
  booking.BookingConfirmationCode = code;
  booking.BookingNotes = req.body.BookingNotes;
  booking.BookingCreated = new Date();
  booking.BookingUpdated = req.body.BookingUpdated;
  booking.BookingCancelled = req.body.bookingCancelled;
  booking.BookingUserId = req.body.BookingUserId;
  bookint.BookingServiceProviderId = req.body.BookingServiceProviderId;

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
      BookingId: id,
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
      BookingId: booking.BookingId,
      BookingDate: booking.BookingDate,
      BookingTime: booking.BookingTime,
      Status: booking.Status,
      BookingConfirmationCode: booking.BookingConfirmationCode,
      BookingNotes: booking.BookingNotes,
      BookingCreated: booking.BookingCreated,
      BookingUpdated: booking.BookingUpdated,
      BookingCancelled: booking.BookingCancelled,
      BookingUserId: booking.BookingUserId,
      BookingServiceProviderId: booking.BookingServiceProviderId,
    },
  };
  dbConnect
    .collection("bookings")
    .update.one(query, update.Doc, function (err, result) {
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
      BookingUserId: id,
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
        BookingServiceProviderId: id,
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
