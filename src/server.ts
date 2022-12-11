import express from "express";
import cors from "cors";

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

// test route
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
