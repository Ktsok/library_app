const Rental = require("../models/rental.model");
const rentalService = require("../services/rental.service");
const bookService = require("../services/book.service");
const bcrypt = require("bcrypt");

const logger = require("../logger");

exports.findAll = async (req, res) => {
  console.log("Find all rentals from collection rentals");

  try {
    // const result = await Rental.find();
    const result = await rentalService.findAll();
    res.status(200).json({ status: true, data: result });
    logger.info("Success in reading all rentals");
    logger.warn("Success in reading all rentals");
    logger.error("Message with error");
  } catch (err) {
    console.log("Problem in reading rentals", err);
    logger.error("Problem in reading all rentals", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.findOne = async (req, res) => {
  console.log("Find rental with specific title");
  let title = req.params.title;

  try {
    // const result = await Book.findOne({title: title});
    const result = await rentalService.findOne(title);
    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      res.status(404).json({ status: false, data: "Book not exist" });
    }
  } catch (err) {
    console.log("Problem in findng rental", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.create = async (req, res) => {
  const book = await bookService.findOneByTitle(req.body.title);
  var rentals = await rentalService.findAll();
  var today = new Date();
  rentals = rentals.filter(
    (rental) =>
      rental.title.toLowerCase() === book.title.toLowerCase() &&
      new Date(rental.rentalTo) >= today && new Date(rental.rentalFrom) <= today
  );
  if (rentals.length >= book.quantity) {
    return res
      .status(400)
      .json({ status: false, data: "No available copies for rental" });
  }

  console.log("Create Rental");
  let data = req.body;

  const newRental = new Rental({
    title: data.title,
    user: data.user,
    rentalTo: data.rentalTo,
    rentalFrom: data.rentalFrom,
  });

  try {
    const result = await newRental.save();
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in creating rental", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.update = async (req, res) => {
  const id = req.body.id;

  console.log("Update rental with id", id);
  let data = req.body;

  const updateRental = {
    title: data.title,
    user: data.user,
    rentalTo: data.rentalTo,
    rentalFrom: data.rentalFrom,
  };

  try {
    const result = await Rental.findOneAndUpdate(
      { title: title },
      updateRental,
      { new: true }
    );
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in updating rental", err);
    res.status(400).json({ status: false, data: err });
  }
};

exports.deleteByTitle = async (req, res) => {
  console.log(req.query.title);
  const title = req.query.title;
  console.log("Delete rental with title", title);

  try {
    const result = await Book.findOneAndDelete({ title: title });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in deleting book", err);
    res.status(400).json({ status: false, data: err });
  }
};
// http://localhost:3000/api/users/test
exports.delete = async (req, res) => {
  const id = req.params.id;

  console.log("Delete rental with id", id);

  try {
    const result = await Rental.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in deleting rental", err);
    res.status(400).json({ status: false, data: err });
  }
};
