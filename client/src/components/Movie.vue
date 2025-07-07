<template>
    <div class="movie-page">
        <h1>My Movies</h1>

        <div v-if="error">{{ error }}</div>
        <div v-if="loading">Loading...</div>
        <div v-if="movies && movies.length === 0">Currently there is no logged in movies.</div>
        <MediaList :items="movies"/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import MediaList from './MediaList.vue';

    const movies = ref([]);
    const error = ref('');
    const loading = ref(true);

    async function fetchMovies() {
        loading.value = true;
        error.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/media');
            if (!response.ok) { // the status is not between 200 & 299
                throw new Error('Failed to fetch items');
            }

            const data = await response.json(); // get data in json form
            // filtering the data for the movies
            movies.value = data.filter(item => item.type === 'movie');
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        } finally {
            loading.value = false;
        }

    }

    onMounted (() => {
        fetchMovies();
    })
</script>