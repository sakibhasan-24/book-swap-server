const express = require("express");
const { test, updateUser } = require("../controller/userController.js");
const { verifyToken } = require("../helper/verify.js");
const router = express.Router();

router.get("/user", test);
router.patch("/update/:id", verifyToken, updateUser);

module.exports = router;
