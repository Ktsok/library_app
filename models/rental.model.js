// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;


// let rentalSchema = new Schema({
//     user: {
//         type: String,
//         required: [true, "User is required field"],
//         max: 50,
//         unique: true,
//         trim: true,
//         lowercase: true,
//     },
//     title: {
//         type: String,
//         required: [true, "Title is required field"],
//         max: 30,
//         trim: true,
//         lowercase: true,
//     },
//     rentalTo: {
//         type: Date,
//         required: [true, "Rental to is required field"],
//         max: 20
//     },
//     rentalFrom: {
//         type: Date,
//         required: [true, "Rental from  is required field"],
//     },
    
// },
// {
//     collection: 'rental',
//     timestamps: true
// })

// module.exports = mongoose.model('rental', rentalSchema)