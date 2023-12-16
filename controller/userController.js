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
    console.log("update", rest);
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      userData: rest,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "Unauthorized ! you can not access here"));
  }
  try {
    const deleteUser = await User.findByIdAndUpdate(req.params.id);
    res.clearCookie("token");
    return res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
      userData: deleteUser,
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(201)
      .json({ success: true, message: "User Logged Out Successfully" });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.params.id);
    console.log(req.params.id);
    console.log("a", existingUser);
    if (!existingUser) {
      return next(errorHandler(404, "User not found"));
    }
    const { password: pass, ...rest } = existingUser._doc;
    return res.status(200).json({
      success: true,
      message: "User Found",
      userData: rest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser, signOut, getSingleUser };
