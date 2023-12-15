const booksCreate = require("../controller/booksCreateController.js");
const { verifyToken } = require("../helper/verify.js");

const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, booksCreate);
module.exports = router;
