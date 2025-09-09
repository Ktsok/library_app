const Book = require("../models/book.model");
const bookService = require("../services/book.service");
const bcrypt = require("bcrypt");
const Rental = require("../models/rental.model");
const rentalService = require("../services/rental.service");

const logger = require("../logger");

exports.findAll = async (req, res) => {
  console.log("Find all books from collection books");

  try {
    // const result = await Book.find();
    const books = await bookService.findAll();
    var rentals = await rentalService.findAll();
    var today = new Date();
    rentals = rentals.filter(
      (rental) =>
        new Date(rental.rentalTo) >= today &&
        new Date(rental.rentalFrom) <= today
    );
    for (let i = 0; i < books.length; i++) {
      books[i].availability =
        books[i].quantity -
        rentals.filter(
          (rental) =>
            rental.title.toLowerCase() === books[i].title.toLowerCase()
        ).length;
    }
    res.status(200).json({ status: true, data: books });
    logger.info("Success in reading all books");

    logger.warn("Success in reading all books");
    logger.error("Message with error");
  } catch (err) {
    console.log("Problem in reading books", err);
    logger.error("Problem in reading all books", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.findOne = async (req, res) => {
  console.log("Find book with specific id");
  let id = req.params.id;
  console.log("Book id", id);

  try {
    // const result = await Book.findOne({id: id});
    const result = await bookService.findOne(id);
    if (result) {
      var rentals = await rentalService.findAll();
      var today = new Date();
      rentals = rentals.filter(
        (rental) =>
          new Date(rental.rentalTo) >= today &&
          new Date(rental.rentalFrom) <= today
      );
      result.availability =
        result.quantity -
        rentals.filter(
          (rental) => rental.title.toLowerCase() === result.title.toLowerCase()
        ).length;

      res.status(200).json({ status: true, data: result });
    } else {
      res.status(404).json({ status: false, data: "Book not exist" });
    }
  } catch (err) {
    console.log("Problem in findng book", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.create = async (req, res) => {
  console.log("Create Book");
  let data = req.body;

  const newBook = new Book({
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    publishedDate: data.publishedDate,
    quantity: data.quantity,
    availability: data.availability,
  });

  try {
    const result = await newBook.save();
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in creating book", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.update = async (req, res) => {
  const id = req.body.id;

  console.log("Update book with id", id);

  const updateBook = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publishedDate: req.body.publishedDate,
    quantity: req.body.quantity,
    // availability: req.body.availability
  };

  try {
    const result = await Book.findOneAndUpdate({ id: id }, updateBook, {
      new: true,
    });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in updating book", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.deleteByTitle = async (req, res) => {
  console.log(req.query.title);
  const title = req.query.title;
  console.log("Delete book with title", title);

  try {
    const result = await Book.findOneAndDelete({ title: title });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in deleting book", err);
    res.status(400).json({ status: false, data: err });
  }
};
// http://localhost:3000/api/users/test

exports.deleteByISBN = async (req, res) => {
  const isbn = req.params.isbn;
  console.log("Delete book by ISBN", isbn);

  try {
    const result = await Book.findOneAndDelete({ isbn: isbn });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in deleting book", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id;
  console.log("Delete book by ID", id);
  try {
    const result = await Book.findByIdAndDelete(id);
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in deleting book", err);
    res.status(400).json({ status: false, data: err });
  }
};
