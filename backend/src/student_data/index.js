
const mongoose = require('mongoose');
const { StudentModel } = require('../models/student'); // Adjust the path accordingly
const studentsData = require('./std_erp'); // Adjust the path accordingly


// Data to be saved


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    // Save students data to the database
    StudentModel.insertMany(studentsData)
    .then(() => {
        console.log('Data saved successfully');
        mongoose.disconnect(); // Close the connection after saving data
    })
    .catch(err => {
        console.error('Error saving data:', err);
        mongoose.disconnect(); // Close the connection in case of an error
    });
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
