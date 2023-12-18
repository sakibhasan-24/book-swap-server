const errorHandler = require("../helper/errorHandle.js");
const { User } = require("../model/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signUpApi = async (req, res, next) => {
  const userData = req.body;

  //   save this data in database
  // what happen if we save something like pass (password) not exits
  const { username, email, password } = userData;
  const hashedPassword = bcrypt.hashSync(password, 10);
  //   it will not save as our model has userName not name
  //   const user = new User({ name, email, password });
  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: "user created", success: true });
  } catch (error) {
    // res.status(501).json({ message: error.message, success: false });
    next(error);
  }
};

// sign in api/log in api
const signInApi = async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(401, "Invalid User"));
  }
  const validPassword = bcrypt.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(errorHandler(401, "Wrong credintial"));
  }
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  //   no need to send password in client
  const { password: hashedPassword, ...userData } = validUser._doc;
  console.log("logged", userData);
  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .json({ userData, message: "succefully logged in", success: true });
  //   res.status(200).json({ validUser, message: "logged in", success: true });
  // we need to create a token
};

const googleSignIn = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ userData: existingUser, message: "logged in", success: true });
  } else {
    // as password is required our model we need a demo password
    // simplycity we use a random number
    const generatedPassword = Math.trunc(Math.random() * 20000);
    const username = req.body.username + "_" + Date.now().toFixed(4);
    // console.log(username);
    // console.log(username);
    const newUser = new User({
      email: req.body.email,
      password: generatedPassword,
      username: username,
      photo: req.body.photoURL,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    await newUser.save();
    // console.log(newUser);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        userData: rest,
        message: "logged in using Google",
        success: true,
      });
  }
};
module.exports = { signUpApi, signInApi, googleSignIn };
