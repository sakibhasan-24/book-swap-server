const {
  booksCreate,
  getAllBooks,
  deleteUserBook,
  getSingleBook,

  updateUserBook,
} = require("../controller/booksCreateController.js");
const { verifyToken } = require("../helper/verify.js");

const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, booksCreate);

router.get("/userbooks/:id", verifyToken, getAllBooks);
router.get("/getSingleBook/:id", getSingleBook);
router.delete("/userbooks/:id", verifyToken, deleteUserBook);
router.post("/updateuserbooks/:id", verifyToken, updateUserBook);
module.exports = router;
