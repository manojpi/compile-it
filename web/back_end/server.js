const express = require('express');
const cors = require('cors');
const passport = require('passport');
const db = require('./db');
const userRouter = require('./routes/user-router');
const initializePassport = require('./db/passport-config')
const app = express();
const PORT = 5001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Passport middleware
app.use(passport.initialize());

// Passport config
initializePassport(passport);


app.use('/api', [
  userRouter,
]);



// User schema
// const User = require("./models/User")

// // `npm install mongoose`
// const mongoose = require("mongoose");
// const options = {
//     keepAlive: true,
//     connectTimeoutMS: 10000,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// const dbUrl = `mongodb+srv://admin:lDwDH1ijgV95YOd8@cluster0.hylimuo.mongodb.net/projectManagementAppMern?retryWrites=true&w=majority`;


// mongoose.connect(dbUrl, options, (err) => {
//   if (err) console.log(err);
// });

// // Validate DB connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Mongo DB Connected successfully");
// });


// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });


// app.post('/create', async(req, res) => {
//   try{
//     const {name, email, password} = req.body;
//     console.log(req.body);
//     const user = await User.create({name, email, password});
//     res.status(201).json({
//       status:201,
//       data: user
//     })
//   }
//   catch(err){
//     res.status(400).json({
//       status:400,
//       message: err.message,
//     })
//   }
// })

// app.post('/login', async(req, res) => {
//   try{
//     const {email, password} = req.body;
//     const user = await User.findByCredentials(email, password);
//     res.status(200).json({
//       status:200,
//       data:user
//     });
//   }
//   catch(err){
//     res.status(400).json({ status:400, message:err.message})
//   }
// })

  app.listen(PORT);