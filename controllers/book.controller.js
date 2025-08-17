const Book = require('../models/book.model');
const bookService = require('../services/book.service');
const bcrypt = require('bcrypt');

const logger = require('../logger');

exports.findAll = async(req, res) => {
  console.log("Find all books from collection books");

  try {
    // const result = await Book.find();
    const result = await bookService.findAll();
    res.status(200).json({status: true, data: result});
    logger.info("Success in reading all books");
    logger.warn("Success in reading all books");
    logger.error("Message with error");
  } catch (err) {
    console.log("Problem in reading books", err);
    logger.error("Problem in reading all books", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOne = async(req, res) => {
  console.log("Find book with specific title");
  let title = req.params.title;

  try {
    // const result = await Book.findOne({title: title});
    const result = await bookService.findOne(title);
    if (result) {
      res.status(200).json({status:true, data: result});
    } else {
      res.status(404).json({status: false, data: "Book not exist"})
    }
  } catch (err) {
    console.log("Problem in findng book", err)
    res.status(400).json({status: false, data: err});
  }
}

exports.create = async(req, res) => {
  console.log("Create Book");
  let data = req.body;
  
   
  const newBook = new Book({
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    publishedDate: data.publishedDate,
    quantity: data.quantity,
    availability: data.availability
  });

  try{
    const result = await newBook.save();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in creating book", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.update = async(req, res) => {
  const title = req.body.title;

  console.log("Update book with title", title);

  const updateBook = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publishedDate: req.body.publishedDate,
    quantity: req.body.quantity,
    availability: req.body.availability
  };

  try {
    const result = await Book.findOneAndUpdate({title: title}, updateBook, {new:true});
    res.status(200).json({status:true, data:result});
  } catch (err) {
    console.log("Problem in updating book", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.deleteByTitle = async(req, res) => {
    console.log (req.query.title);
    const title = req.query.title
    console.log("Delete book with title", title);

    try {
      const result = await Book.findOneAndDelete({title:title});
      res.status(200).json({status:true, data: result});
    } catch (err) {
      console.log("Problem in deleting book", err);
      res.status(400).json({status: false, data: err});
    }
}
// http://localhost:3000/api/users/test

exports.deleteByISBN = async(req, res) => {
  const isbn = req.params.isbn;
  console.log("Delete book by ISBN", isbn);

  try {
    const result = await Book.findOneAndDelete({isbn:isbn});
    res.status(200).json({status:true, data: result});
  } catch (err) {
    console.log("Problem in deleting book", err);
    res.status(400).json({status: false, data: err});
  }
}


