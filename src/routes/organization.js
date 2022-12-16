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
          res.json(result);
        }
      });
  });
  
  // post a new organization
  recordRoutes.route("/organizations").post(async function (req, res) {
    // new organization of Organization model
    const dbConnect = dbo.getDb();
    let organization = new Organization();
    organization.OrganizationId = req.body.OrganizationId;
    organization.OrganizationName = req.body.OrganizationName;
    organization.Description = req.body.Description;
    organization.Address = req.body.Address;
    organization.Phone = req.body.Phone;
    organization.Email = req.body.Email;
    organization.username = req.body.username;
    organization.status = req.body.status;
    organization.type = req.body.type;
  
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
  
  // Get an organization by OrganizationId
  recordRoutes.route("/organizations/:id").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    const id = req.params.id;
    dbConnect
      .collection("organizations")
      .find({ OrganizationId: id })
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching organization!");
          console.log(err);
        } else {
          res.json(result);
          console.log("Organization fetched");
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
        OrganizationId: organization.OrganizationId,
        OrganizationName: organization.OrganizationName,
        Description: organization.Description,
        Address: organization.Address,
        Phone: organization.Phone,
        Email: organization.Email,
        username: organization.username,
        status: organization.status,
        type: organization.type,
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

  module.exports = recordRoutes