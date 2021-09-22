const mongoose = require("mongoose");

//Author schema
const authorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String]
});

// Author Model
const authorModel = mongoose.model("authors",authorSchema);

module.exports = authorModel;