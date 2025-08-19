const Rental = require('../models/rental.model');

function findAll() {
  const result = Rental.find();
  return result;
}

function findOne(book) {
  const result = Rental.findOne({book:book});
  return result;
}

async function findLastInsertedRental(){
  console.log("Find last inserted rental");

  try {
    const result = await Rental.find().sort({_id:-1}).limit(1);
    console.log("Success in finding last inserted rental", result[0]);
    return result[0]
  } catch (err){
    console.log("Problem in finding last inserted rental", err);
    return false
  }
}

module.exports = { findAll, findOne, findLastInsertedRental }