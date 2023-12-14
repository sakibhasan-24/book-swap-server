const express = require("express");
const signUpApi = require("../controller/authController");
const router = express.Router();

router.post("", signUpApi.signUpApi);
router.post("/login", signUpApi.signInApi);
router.post("/google", signUpApi.googleSignIn);
module.exports = router;
