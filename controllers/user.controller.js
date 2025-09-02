const User = require('../models/user.model');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');

const logger = require('../logger');

exports.findAll = async(req, res) => {
  console.log("Find all users from collection users");

  try {
    // const result = await User.find();
    const result = await userService.findAll();
    res.status(200).json({status: true, data: result});
    logger.info("Success in reading all users");
    logger.warn("Success in reading all users");
    logger.error("Message with error");
  } catch (err) {
    console.log("Problem in reading users", err);
    logger.error("Problem in reading all users", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOne = async(req, res) => {
  console.log("Find user with specific id");
  let id = req.params.id;

  try {
    // const result = await User.findOne({id: id});
    const result = await userService.findOne(id);
    if (result) {
      res.status(200).json({status:true, data: result});
    } else {
      res.status(404).json({status: false, data: "User not exist"})
    }
  } catch (err) {
    console.log("Problem in findng user", err)
    res.status(400).json({status: false, data: err});
  }
}

exports.create = async(req, res) => {
  console.log("Create User");
  let data = req.body;
  const SaltOrRounds = 10;
  
  let hashedPassword = "";
  if (data.password)
    hashedPassword = await bcrypt.hash(data.password, SaltOrRounds)
   
  const newUser = new User({
    username: data.username,
    password: hashedPassword,
    name: data.name,
    surname: data.surname,
    email: data.email,
    address: {
      area: data.address.area,
      road: data.address.road
    },
    phone: {
      type: data.phone.type,
      number: data.phone.number
    }
  });

  try{
    newUser.markModified('phone');
    newUser.markModified('address');
    const result = await newUser.save();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in creating user", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.update = async(req, res) => {
  const id = req.params.id;

  console.log("Update user with id", id);

  // Build the update object with $set operator
  const updateData = {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      'address.area': req.body.address?.area,
      'address.road': req.body.address?.road,
      'phone.type': req.body.phone?.type,
      'phone.number': req.body.phone?.number
    }
  };

  // If password is provided, hash and add it to updateData
  if (req.body.password) {
    const SaltOrRounds = 10;
    updateData.$set.password = await bcrypt.hash(req.body.password, SaltOrRounds);
  }

  try {
    const result = await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!result) {
      return res.status(404).json({ status: false, data: "User not found" });
    }
    
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    console.log("Problem in updating user", err);
    res.status(400).json({ status: false, data: err.message });
  }
}


exports.deleteByUsername = async(req, res) => {
    const username = req.params.username
    console.log("Delete user with username", username);

    try {
      const result = await User.findOneAndDelete({username:username});
      res.status(200).json({status:true, data: result});
    } catch (err) {
      console.log("Problem in deleting user", err);
      res.status(400).json({status: false, data: err});
    }
}
// http://localhost:3000/api/users/test

exports.deleteByEmail = async(req, res) => {
  const username = req.params.username
  const email = req.params.email;
  console.log("Delete user by email", email);

  try {
    const result = await User.findOneAndDelete({email:email});
    res.status(200).json({status:true, data: result});
  } catch (err) {
    console.log("Problem in deleting by email", err);
    res.status(400).json({status: false, data: err});
  }
} 
// http://localhost:3000/api/users/test/email/lakis@aueb.gr


exports.checkDuplicateEmail = async(req, res) => {
  const email = req.params.email;

  console.log("Check for duplicate email address", email);
  try {
    const result = await User.findOne({ email: email });
    if (result) {
      console.log("Exists")
      res.status(400).json({ status: false, data: result });
    } else {
      console.log("Not Exists")
      res.status(200).json({ status: true, data: result });
    }
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding email address: ${email}`, err);
  }
}