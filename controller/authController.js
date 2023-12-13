const { User } = require("../model/usermodel.js");
const bcrypt = require("bcryptjs");
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
module.exports = signUpApi;
