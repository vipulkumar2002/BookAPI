
const mongoose = require("mongoose");

//Creating a book schema
const Bookschema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    NoOfPage: Number,
    category: [String],
    publication:Number
});
 

// Create book model
const bookModel = mongoose.model(Bookschema);

module.exports = bookModel;
