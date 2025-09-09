const Book = require('../models/book.model');

function findAll() {
  const result = Book.find();
  return result;
}

function findOne(id) {
  const result = Book.findOne({_id:id});
  return result;
}

function findOneByTitle(title) {
  const result = Book.findOne({title:title});
  return result;
} 

async function findLastInsertedBook(){
  console.log("Find last inserted book");

  try {
    const result = await Book.find().sort({_id:-1}).limit(1);
    console.log("Success in finding last inserted book", result[0]);
    return result[0]
  } catch (err){
    console.log("Problem in finding last inserted book", err);
    return false
  }
}

module.exports = { findAll, findOne, findLastInsertedBook, findOneByTitle }