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
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      booksList: savedBooks,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  console.log("get all books", req.user);
  console.log("get all books", req.params.id);
  if (req.params.id === req.user.id) {
    try {
      const allBooks = await BookListing.find({ owner: req.params.id });
      res.status(200).json({
        success: true,
        message: "Books found",
        allBooks: allBooks,
      });
    } catch (error) {
      next(error);
    }
  }
};
const deleteUserBook = async (req, res, next) => {
  const existBook = await BookListing.findOne({ _id: req.params.id });
  console.log(existBook);
  if (!existBook) {
    return res.status(401).json({
      success: false,
      message: "Book not found",
    });
  }
  if (req.user.id !== existBook.owner) {
    return res.json({
      success: false,
      message: "you can not delete it",
    });
  }
  const deleteBook = await BookListing.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    deleteBook: deleteBook,
  });
};
module.exports = { booksCreate, getAllBooks, deleteUserBook };
