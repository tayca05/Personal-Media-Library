# Personal-Media-Library
Save and organize your favorite movies, musics and books all in one place.

## Description
This web app lets you search for movies, music and books from different public APIs
(OMDb, iTunes, OpenLibrary) or create your own. You get to view your saved items, categorize them, and keep track of your favorites all in one dashboard.

## Features
- Search for movies (via OMDb API)
- Search for music (via iTunes API)
- Search for books (via OpenLibrary API)
- Save your favorite items to your personal library
- View saved items by category (Movies, Music, Books)

## Installation
## Clone the repo
```bash
git clone https://github.com/tayca05/Personal-Media-Library.git
cd Personal-Media-Library

# For the frontend Vue Vite
cd client
npm install

# For the backend (Node.js/Express)
cd ../server
npm install

# Running The App
# In separate terminals 
cd server 
node index.js

cd client
npm run dev

# To see the App open http://localhost:5173/