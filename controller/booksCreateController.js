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
const updateUserBook = async (req, res, next) => {
  const existBook = await BookListing.findById({ _id: req.params.id });
  if (!existBook) {
    return res.status(401).json({
      success: false,
      message: "Book not found",
    });
  }
  if (existBook.owner !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: "you can not update it",
    });
  }
  try {
    const updatedBook = await BookListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      updatedBook: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleBook = async (req, res, next) => {
  try {
    const book = await BookListing.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book found",
      book: book,
    });
  } catch (error) {
    next(error);
  }
};

const allBooks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order || "desc";
    const searchText = req.query.searchText || "";
    let borrow = req.query.borrow;
    let sell = req.query.sell;
    let fixedPrice = req.query.fixedPrice;
    console.log(req.query);
    if (borrow === undefined || borrow === "false") {
      borrow = { $in: [true, false] };
    }
    if (sell === undefined || sell === "false") {
      sell = { $in: [true, false] };
    }
    if (fixedPrice === undefined || fixedPrice === "false") {
      fixedPrice = { $in: [true, false] };
    }
    const books = await BookListing.find({
      title: { $regex: searchText, $options: "i" },
      borrow: borrow,
      sell: sell,
      fixedPrice: fixedPrice,
    })
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(startIndex);
    console.log(books.length);
    res.status(200).json({
      success: true,
      message: "Books found",
      books: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  booksCreate,
  getAllBooks,
  deleteUserBook,
  updateUserBook,
  getSingleBook,
  allBooks,
};
