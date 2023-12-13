const express = require("express");
const signUpApi = require("../controller/authController");
const router = express.Router();

router.post("", signUpApi);
module.exports = router;
