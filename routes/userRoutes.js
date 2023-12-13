const express = require("express");
const { test } = require("../controller/userController.js");
const router = express.Router();

router.get("/user", test);
module.exports = router;
