const errorHandler = require("../helper/errorHandle.js");
const bcrypt = require("bcryptjs");
const { User } = require("../model/usermodel.js");
const test = async (req, res) => {
  res.json({ message: "test....." });
};

const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "Unauthorized ! you can not access here"));
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          photo: req.body.photo,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser };
