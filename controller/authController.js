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
  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .json({ userData, message: "succefully logged in", success: true });
  //   res.status(200).json({ validUser, message: "logged in", success: true });
  // we need to create a token
};
module.exports = { signUpApi, signInApi };
