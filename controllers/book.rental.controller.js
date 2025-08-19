const Book = require('../models/book.model');

exports.findAll = async(req, res) => {
  console.log("Find from all books the rentals");

  try {
    const result = await Book.find({},{title:1, rentals:1, _id:0});
    res.status(200).json({status:true, data:result});
  } catch (err) {
    console.log("Problem in finding from all books the rentals");
    res.status(400).json({status: false, data: err});
  }
}

exports.findOne = async(req, res) => {
  console.log("Find rentals for specific book");
  const username = req.params.title;

  try {
    const result = await Book.findOne({title: title}, {title:1, rentals:1, _id:0});
    res.status(200).json({status:true, data: result});
  } catch (err) {
    console.log("Problem in finding book's rentals", err);
    res.status(400).json({status:false, data:err})
  }
}

exports.create = async(req, res) => {
  console.log("Insert renatls to book");
  const title = req.body.title;
  const rentals = req.body.rentals;

  try {
    const result = await Book.updateOne(
      {title: title},
      {
        $push: {
          rentals: rentals
        }
      }
    );
    res.status(200).json({status:true, data: result});
  } catch (err) {
    console.log("Problem in inserting rental", err);
    res.status(400).json({status:false, data:err})
  }
}

exports.update = async(req, res) => {
  const title = req.body.title;
  const rental_id = req.body.rental_id;
  const rental_rentalTo = req.body.rental_rentalTo;

  console.log("Update rental for title:", title);
  try {
    const result = await User.updateOne(
      { title:title, "rental._id": rental_id },
      { $set: {
          "rentals.$.rentalTo": rental_rentalTo
      }}
    );
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in updating rental", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.delete = async(req, res) => {
  const title = req.params.title;
  const rental_id = req.params.id;

  console.log("Delete rental from book:", title);

  try {
    const result = await Book.updateOne(
      { title: title },
      { 
        $pull: {
          rentals:{ _id: rental_id }
        }
      }
    );
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in deleting rental", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.stats1 = async(req, res) => {
  console.log("For each book return total amount and num of rentals");

  try  {
    const result = await Book.aggregate([
      {
        $unwind: "$rentals"
      },
      {
        $project: {
          _id:1,
          title: 1,
          rentals: 1
        }
      },
      {
        $group: {
          _id: {title: "$title", rental: "$rentals.rental"},
          totalAmount: {
            $sum: { $multiply: ["$rentals.cost", "$rentals.rentalTo"]}
          },
          count: {$sum:1}
        }
      },
      { $sort:{"_id.title":1, "_id.rental":1 } }
    ]);
    res.status(200).json({status:true, data:result});
  } catch (err) {
    console.log("Problem in stats1", err);
    res.status(400).json({status: false, data: err});
  }
}