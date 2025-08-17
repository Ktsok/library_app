const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required field"],
        max: 50,
        unique: true,
        trim: true,
        lowercase: true,
    },
    author: {
        type: String,
        required: [true, "Author is required field"],
        max: 30,
        trim: true,
        lowercase: true,
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required field"],
        max: 20
    },
    publishedDate: {
        type: Date,
        required: [true, "Published Date is required field"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required field"],
    },
    availability: {
        type: Number,
        required: [true, "Availability is required field"],
    }
    
},
{
    collection: 'books',
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)