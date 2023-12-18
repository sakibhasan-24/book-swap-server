const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  signOut,

  getSingleUser,
} = require("../controller/userController.js");
const { verifyToken } = require("../helper/verify.js");
const router = express.Router();

router.get("/user", test);
router.get("/user/:id", verifyToken, getSingleUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/logout", signOut);

module.exports = router;
