// import mongoose 
const mongoose = require('mongoose');

// schema of the items 
const mediaSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['movie', 'books', 'music'],
        required: true
    },
    genre: {
        type: [String], // storing 'genre' as an array of strings
        default: [] // if no genre is entered, it is null 
    },
    rating: { // has a range 1-5
        type: Number,
        min: 1,
        max: 5
    },
    notes: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    },
    image: { 
        type: String
    }
})

// Create the media item
const mediaItem = mongoose.model('MediaItem', mediaSchema);

// export model
module.exports = mediaItem; // make item usable for other files