const {
  booksCreate,
  getAllBooks,
  deleteUserBook,
} = require("../controller/booksCreateController.js");
const { verifyToken } = require("../helper/verify.js");

const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, booksCreate);
router.get("/userbooks/:id", verifyToken, getAllBooks);
router.delete("/userbooks/:id", verifyToken, deleteUserBook);
module.exports = router;
