const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let adressSchema = new Schema({
    area: { type: String },
    road: { type: String }
}, { _id: false });

let phoneSchema = new Schema({
    type: {type:String},
    number: {type:String}
}, { _id: false });

let booksSchema = new Schema({
    title: { type: String },
    author: { type: String },
    isbn: { type: String },
    publishedDate: { type: Date },
    quantity: { type: Number },
    availability: { type: Number }
    })


let userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required field"],
        max: 20,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required field"],
        max: 20,
    },
    name: {
        type: String,
        required: [true, "Name is required field"],
        max: 20
    },
    surname: {
        type: String,
        required: [true, "Surname is required field"],
        max: 20
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        max: 20,
        unique: true,
        trim: true,
        lowercase: true
    },
    address: adressSchema,
    phone: phoneSchema,
    roles: {type: [String], null: true}
},
{
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)