const { Organization } = require("../models/organization"); // Organization model

const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();

// Get all organizations
recordRoutes.route("/organizations").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("organizations")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        console.log("Getting All orgs");
        res.json(result);
      }
    });
});

// Get an organization by userId
recordRoutes.route("/organization/:id").get(async function (req, res) {
  console.log("Fetching individual organization");
  const dbConnect = dbo.getDb();
  const serviceProviderId = req.params.id;
  console.log("params: ", req.params);
  dbConnect
    .collection("organizations")
    .findOne({ serviceProviderId: serviceProviderId }, function (err, result) {
      if (err) {
        res.status(400).send("Error fetching organization!");
        console.log(err);
      } else {
        res.json(result);
      }
    });
});

// ----- POST ----- //

// post a new organization
recordRoutes.route("/organizations").post(async function (req, res) {
  // new organization of Organization model
  const dbConnect = dbo.getDb();
  let organization = new Organization();
  organization.name = req.body.name;
  organization.description = req.body.description;
  organization.address = req.body.address;
  organization.phone = req.body.phone;
  organization.email = req.body.email;
  organization.serviceProviderId = req.body.serviceProviderId;
  organization.status = req.body.status;

  console.log(req.body); //for testing
  console.log(organization); //for testing

  dbConnect
    .collection("organizations")
    .insertOne(organization, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting organization!");
        console.log(err);
        console.log("Error inserting organization!");
      } else {
        res.json(result);
        console.log("Organization added");
      }
    });
});

// Organization update
recordRoutes.route("/organizations/:id").put(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const organization = req.body;
  const query = { _id: id };
  const updateDoc = {
    $set: {
      name: organization.OrganizationName,
      description: organization.Description,
      address: organization.Address,
      phone: organization.Phone,
      email: organization.Email,
      serviceProviderId: organization.username,
      status: organization.status,
    },
  };
  dbConnect
    .collection("organizations")
    .updateOne(query, updateDoc, function (err, result) {
      if (err) {
        res.status(400).send("Error updating organization!");
        console.log(err);
        console.log("Error updating organization!");
      } else {
        res.json(result);
        console.log("Organization updated Successfully");
      }
    });
});

// Organization delete
recordRoutes.route("/organizations/:id").delete(async function (req, res) {
  const dbConnect = dbo.getDb();
  const id = req.params.id;
  const query = { _id: id };
  dbConnect
    .collection("organizations")
    .deleteOne(query, function (err, result) {
      if (err) {
        res.status(400).send("Error deleting organization!");
        console.log(err);
        console.log("Error deleting organization!");
      } else {
        res.json(result);
        console.log("Organization deleted Successfully");
      }
    });
});

module.exports = recordRoutes;
