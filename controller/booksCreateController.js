const BookListing = require("../model/booksmodel.js");

const booksCreate = async (req, res, next) => {
  try {
    // const books = await BookListing.create(req.body);
    const books = req.body;
    const booksList = new BookListing(books);
    const savedBooks = await booksList.save();
    // const books = await res.status(201).json({
    //   success: true,
    //   message: "Book added successfully",
    //   booksList: books,
    // });
    res
      .status(201)
      .json({
        success: true,
        message: "Book added successfully",
        booksList: savedBooks,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = booksCreate;
