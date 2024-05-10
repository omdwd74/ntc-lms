const mongoose = require('mongoose');
const { BookModel } = require('../models/book'); 
const erp_collections = require('./erp');

mongoose.connect('mongodb://localhost:27017/lms', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
var i=0,j =0;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");

    erp_collections.forEach(async (item) => {
        try {
           
            const newBook = new BookModel(item);
             newBook.save();

            // console.log("Book saved:", newBook);
            j++;
        } catch (err) {
            console.error("Error saving book:", err);
            console.log(item);
            i++;
            
        }
    });
    console.log(i);
    console.log("done");
    console.log(j);
});
