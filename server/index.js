// importing dependencies (frameworks)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // let the backend and frontend talk

// the express app creation
const app = express();

// let the app read and understand JSON formatting
app.use(express.json()); 
app.use(cors()); // allows Vue to call the server

const mediaRoutes = require('./routes/media'); // the router
app.use('/api/media', mediaRoutes);

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personalmedialibrary')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('This is Personal-Media-Library!');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
})