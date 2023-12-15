const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
} = require("../controller/userController.js");
const { verifyToken } = require("../helper/verify.js");
const router = express.Router();

router.get("/user", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/signout", verifyToken, signOut);

module.exports = router;
