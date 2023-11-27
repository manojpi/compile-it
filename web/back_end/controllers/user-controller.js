const User = require("../db/models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../db/secretKey");
const { exec } = require('child_process');
const updateFile = require('./util')

const createUser = async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  } else {
    const newUser = new User(req.body);
    // Hash password before saving in database
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        newUser.password = hashedPassword;
        await newUser.save();
        res.json({"message": "Signup Success", "error": null})
    } catch (error) {
        res.json({success: false, error: error.message, message: "Login Failed"})
    }
  }
};

const updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await User.updateOne({ email: req.params.email }, body);
    return res.status(200).json({
      success: true,
      message: "User updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "User not updated!",
    });
  }
};

const getUserByMail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, id: user._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const loginUser = (req, res) => {

  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({success: false, message: "invalid email or password" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user.id,
          name: user.name,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          secretKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              message: "Login Successful",
              token: "Bearer " + token,
              data: payload,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({success: false, message: "invalid email or password" });
      }
    });
  });
};

const compile = async (req, res) => {
  console.log("HIT");
console.log(req.body);
updateFile('./../../program.txt', req.body.code)
// Specify the path to your Java file
const command = './../../soph ./../../program.txt';

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  return res.status(400).json({status: 400, message: stdout})
});

  // const user = await User.findOne({ email: req.body.email });
  // if (user) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Email already exists" });
  // } else {
  //   const newUser = new User(req.body);
  //   // Hash password before saving in database
  //   try {
  //       const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //       newUser.password = hashedPassword;
  //       await newUser.save();
  //       res.json({"message": "Signup Success", "error": null})
  //   } catch (error) {
  //       res.json({success: false, error: error.message, message: "Login Failed"})
  //   }
  // }
};

module.exports = {
  createUser,
  getUserByMail,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  compile
};