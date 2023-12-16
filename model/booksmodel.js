const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    conditions: {
      type: String,
      enum: ["new", "like new", "good", "old"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    borrow: {
      type: Boolean,
      default: true,
    },
    sell: {
      type: Boolean,
      default: false,
    },
    fixedPrice: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookListing = mongoose.model("BookList", bookSchema);

module.exports = BookListing;
