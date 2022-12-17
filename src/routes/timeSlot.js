const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();

//Time slots

// ----- GET ----- //

// Get all time slots
recordRoutes.route("/timeslots").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("timeslots")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching time slots!");
        console.log(err);
      } else {
        res.json(result);
        console.log("Time slots fetched");
      }
    });
});

// Get all Slots by Organization Id
recordRoutes.route("/timeslots/organization/:id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  console.log("params: ", req.params);
  dbConnect
    .collection("timeslots")
    .find({
      organizationId: id,
    })
    .limit(500)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching time slots!");
        console.log(err);
      } else {
        res.json(result);
        console.log("Time slots fetched");
      }
    });
});
// ----- POST -----//

// post a new time slot
recordRoutes.route("/timeslots").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const timeslot = req.body;
  dbConnect.collection("timeslots").insertOne(timeslot, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting time slot!");
      console.log(err);
      console.log("Error inserting time slot!");
    } else {
      res.json(result);
      console.log("Time slot added");
    }
  });
});

// ----- PUT ----- //

// Time slot update
recordRoutes.route("/timeslots/:id").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const timeslot = req.body;
  const query = { _id: id };
  const updateDoc = {
    $set: {
      TimeSlotId: timeslot.TimeSlotId,
      TimeSlotDate: timeslot.TimeSlotDate,
      TimeSlotStartTime: timeslot.TimeSlotStartTime,
      TimeSlotEndTime: timeslot.TimeSlotEndTime,
      TimeSlotStatus: timeslot.TimeSlotStatus,
    },
  };
  dbConnect
    .collection("timeslots")
    .update.one(query, update.Doc, function (err, result) {
      if (err) {
        res.status(400).send("Error updating time slot!");
        console.log(err);
        console.log("Error updating time slot!");
      } else {
        res.json(result);
        console.log("Time slot updated Successfully");
      }
    });
});

// ------ DELETE ----- //

// Delete a time slot
recordRoutes.route("/timeslots/:id").delete(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const query = { _id: id };
  dbConnect.collection("timeslots").deleteOne(query, function (err, result) {
    if (err) {
      res.status(400).send("Error deleting time slot! ", id);
      console.log(err);
      console.log("Error deleting time slot! ", id);
    } else {
      res.json(result);
      console.log("Time slot deleted Successfully", id);
    }
  });
});

module.exports = recordRoutes;
