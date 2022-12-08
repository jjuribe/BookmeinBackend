const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://santiago:nk_c6HC99u!beCj@cluster0.uhezh.mongodb.net/?retryWrites=true&w=majority";//process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

let dbConnection;

module.exports = {
connectToServer: function(callback) {
    client.connect(function(err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("bookmein");
    console.log("Successfully connected to BookmeIn MongoDB.");

    return callback();
  });
},

 

  getDb: function () {
    return dbConnection;
  },
};