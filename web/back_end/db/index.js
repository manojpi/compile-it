const mongoose = require('mongoose');

// `npm install mongoose`
const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// const dbUrl = `mongodb+srv://<username>:<password>@cluster0.fxhrvm0.mongodb.net/`;
const dbUrl = `mongodb+srv://test_user:test_password@cluster0.fxhrvm0.mongodb.net/`;

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

// Validate DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongo DB Connected successfully");
});


module.exports = db;