const {
  booksCreate,
  getAllBooks,
} = require("../controller/booksCreateController.js");
const { verifyToken } = require("../helper/verify.js");

const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, booksCreate);
router.get("/userbooks/:id", verifyToken, getAllBooks);
module.exports = router;
