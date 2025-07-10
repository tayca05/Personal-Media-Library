// importing dependencies (frameworks)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // let the backend and frontend talk
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// the express app creation
const app = express();

// let the app read and understand JSON formatting
app.use(express.json()); 
app.use(cors()); // allows Vue to call the server

app.use('/uploads', express.static('uploads')); // let Vue access images

const mediaRoutes = require('./routes/media'); // the router
app.use('/api/media', mediaRoutes);

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personalmedialibrary')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('This is Personal-Media-Library!');
})

// SEARCH
app.get('/api/search', async (req, res) => {
    const title = req.query.title;
    console.log('TITLE RECEIVED:', title);
    const apiKey = 'b128af0d'
    const omdbUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;
    console.log('OMDB URL:', omdbUrl);

    try {
        const response = await fetch(omdbUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/api/deezer', async (req, res) => {
    const query = req.query.q;
    const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(deezerUrl);
    const data = await response.json();
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
})