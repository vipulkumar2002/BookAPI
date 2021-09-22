const mongoose = require("mongoose");

//Create publication Schema 
const publicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String]
});

// Publication model

const publicationModel = mongoose.model(publicationSchema);

module.exports =  publicationModel;