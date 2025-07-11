// import modules
const express = require('express');
const router = express.Router(); // app for the routes
const mediaItem = require('../models/media_item'); // the database model
const multer = require('multer');
const fetch = require('node-fetch');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' ' + file.originalname);
    }
})

const upload = multer({storage: storage});

// CREATE
router.post('/', upload.single('image'), async (req, res) => {
    try {
        console.log('New media item is here.', req.body);
        console.log('Image info: ', req.body.image);

        let imageValue = null;

        const itemData = {
            ...req.body,
            rating: req.body.rating ? req.body.rating : null,
            image: req.file ? req.file.path : req.body.image
        }

        const item = new mediaItem(itemData); // the new item created 
        const savedItem = await item.save();    

        console.log('Saved the new item.', savedItem);
        res.status(201).json(savedItem); // send the item back to the front end
    } catch (error) {
        console.error('Error saving item:', error.message);
        res.status(400).json({message: error.message}); // send the error message
    }
})

// READ
router.get('/', async (req, res) => {
    try {
        const items = await mediaItem.find(); // get the items 
        res.json(items);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// READ BY ID
router.get('/:id', async (req, res) => {
    try {
        const item = await mediaItem.findById(req.params.id);
        if (!item) {
            res.status(404).json({message: 'Item not found.'});
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// UPDATE
router.put('/:id', async (req, res) => { // updating the item with the specific id
    try {
        const updatedItem = await mediaItem.findByIdAndUpdate(
            req.params.id,
            req.body, // new data to update
            {new: true}
        )
        res.json(updatedItem); // send the updated item to frontend
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await mediaItem.findByIdAndDelete(req.params.id);
        res.status(201).json({message: 'Item deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// SEARCH
router.get('/search', async (req, res) => {
    const title = req.query.title;
    const apiKey = 'b128af0d'
    const omdbUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

    try {
        const response = await fetch(omdbUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;