const mongoose = require('mongoose');
const { BookModel } = require('../models/book'); // Assuming your BookModel is correctly exported
const erp_collections = require('./erp');

mongoose.connect('mongodb://localhost:27017/lms', {
    useNewUrlParser: true, // Corrected option name
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");

    // Iterate over the data and save each item
    erp_collections.forEach(async (item) => {
        try {
            // Create a new instance of BookModel with the item data
            const newBook = new BookModel(item);

            // Save the newBook instance to the database
            await newBook.save();

            console.log("Book saved:", newBook);
        } catch (err) {
            console.error("Error saving book:", err);
        }
    });
});
