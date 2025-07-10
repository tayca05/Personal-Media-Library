<template>
    <div class="search">
        <h1>Search for new item</h1>
        <div class="type-row">
                <label for="" class="type-label">Choose a media type:</label>
                <div class="buttons">
                    <span class="type-button">
                        <input type="radio" name="type" value="movie" v-model="type" required>
                        <label for="movie">Movie</label>
                    </span>
                    <span class="type-button">
                        <input type="radio" name="type" value="music" v-model="type">
                        <label for="music" >Music</label>
                    </span>
                    <span class="type-button">
                        <input type="radio" name="type" value="books" v-model="type">
                        <label for="books">Book</label>    
                    </span>
                </div>
            </div>
        <input type="text" placeholder="Search" v-model="searchQuery">
        <button @click="search">Search</button>

        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>

        <div v-if="searchResults.length">
            <h2>Results:</h2>
            <div class="media-list">
                <div v-for="result in searchResults" class="media-item">
                    <div v-if="result.type === 'movie'" >
                        <img :src="resolveURL(result.Poster)" alt="" class="movie-image">
                        <h2>{{ result.Title }}</h2>
                        <p>{{ result.Year }}</p>
                    </div>
                    <div v-if="result.type === 'music'">
                        <img :src="resolveURL(result.image)" alt="" class="music-image">
                        <h2>{{ result.title }}</h2>
                        <p>{{ result.artist }}</p>
                    </div>
                    <div v-if="result.type === 'books'">
                        <img :src="resolveURL(result.image)" alt="" class="movie-image">
                        <h2>{{ result.title }}</h2>
                        <p>{{ result.author_name }}</p>
                    </div>
                    <input type="checkbox" :value="result" v-model="selectedItems">
                </div>
            </div>
            <button @click="saveSelectedItems" :disabled="selectedItems.length === 0">Save Item to Library</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import router from '../router';

    const movieApiKey = 'b128af0d';

    const type = ref('');
    const searchQuery = ref('');
    const searchResults = ref([]);
    const selectedItems = ref([]);
    const loading = ref(false);
    const error = ref('');

    async function search() {
        error.value = '';
        loading.value = true;
        searchResults.value = [];
        
        console.log('Search clicked');
        console.log('Type:', type.value);
        console.log('Query:', searchQuery.value);
        try {
            if (type.value === 'movie') {
                console.log('Searching movie: ', searchQuery);
                await searchOMDb();
            } else if (type.value === 'music') {
                await searchDeezer();
            } else if (type.value === 'books') {
                await searchOpenLibrary();
            } else {
                error.value = "Please choose a type.";
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    async function searchOMDb() {
        const url = `https://www.omdbapi.com/?apikey=${movieApiKey}&s=${searchQuery.value}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Raw response:', data);
        if (data.Response === "False") throw new Error(data.Error); // no response

        const withType = data.Search.map(item => ({
            ...item,
            type: 'movie'
        }))

        searchResults.value = withType;

    }

    async function searchDeezer() {
        const query = cleanAndFormatQuery(searchQuery.value);
        const url = `https://itunes.apple.com/search?term=${query}&entity=song`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error); // no response

        const withType = data.results.map(item => ({
            title: item.trackName,
            artist: item.artistName,
            image: item.artworkUrl100.replace('100x100', '600x600'), // nicer size!
            type: 'music'
        }));

        searchResults.value = withType;
    }

    async function searchOpenLibrary() {
        const url= `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery.value)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error); // no response

        const withType = data.docs.map(item => ({
            ...item, 
            image: item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
            : '',
            type: 'books'
        }))
        searchResults.value = withType;
    }

    async function saveItem(item) {
        let imageUrl = '';
        let title = '';
        let genre = [];

        // Movie (OMDb)
        if (item.type === 'movie') {
            title = item.Title;
            imageUrl = item.Poster || '';
            genre = item.Genre ? item.Genre.split(',').map(g => g.trim()) : [];

        // Music (iTunes)
        } else if (item.type === 'music') {
            title = item.title || item.name || 'Unknown Title';
            imageUrl = item.image ? item.image.replace('100x100', '600x600') : '';
            genre = []; // optional — iTunes may not return genre

        // Book (Open Library)
        } else if (item.type === 'books') {
            title = item.title;
            imageUrl = item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
            : '';
            genre = [];
        }

        // Now send it to your backend
        await fetch('http://localhost:3000/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title,
            type: type.value,
            genre,
            notes: '',
            image: imageUrl
            })
        });
    }

    async function saveSelectedItems() {
        if (selectedItems.value.length === 0) {
            alert("Please select at least one item.");
            return;
        }

        for (const item of selectedItems.value) {
            await saveItem(item);
        }

        router.push(`/${type.value}`);
        selectedItems.value = []; 
        
    }

    function cleanAndFormatQuery(query) {
        return encodeURIComponent(
            query
            .trim()                 // Remove leading/trailing spaces
            .replace(/\s+/g, ' ')   // Collapse multiple spaces
            .replace(/\b\w/g, c => c.toUpperCase())  // Capitalize each word
    );
}

    function resolveURL(url) {
        if (!url) {
            return '';
        }

        if (url.startsWith('http')) {
            return url;
        }

        return `http://localhost:3000/${url}`
    }
</script>

<style scoped>
    .search {
        border: solid;
        border-color: #2c3e50;
        border-radius: 20px;

        padding: 2rem;
        padding-bottom: 2rem;
        margin-top: 2rem;

        
    }

    .type-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 150px;
    }

    .type-label {
        font-weight: bold;
    }

    .type-button {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .type-button input {
        appearance: none;
        width: 15px;
        height: 15px;
        border: 2px solid #3c4e61;
        border-radius: 50%;
        background-color: #1e2a36; /* Default background */

        display: inline-block;
        position: relative;
        cursor: pointer;
    }

    .type-button input:checked {
        background-color: #3c4e61;
    }

    .search input[type=text] {
        padding: 10px;
        border: none;
        margin-right: 16px;
        font-size: 17px;

        width: 500px;

        background-color: #1e2a36;
        border-radius: 10px;
    }

    @media screen and (max-width: 600px) {
        input[type=text] {
            float: none;
            display: block;
            text-align: left;
            width: 100%;
            margin: 0;
            padding: 14px;
        }
    }

    .results {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .media-item h2 {
        color: #1e2a36;
    }

    p {
        color: #1e2a36;
    }
</style>