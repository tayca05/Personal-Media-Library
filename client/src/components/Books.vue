<template>
    <div class="books-page">
        <h1>My Books</h1>

        <div v-if="error">{{ error }}</div>
        <div v-if="loading">Loading...</div>
        <div v-if="books && books.length === 0">Currently there is no logged in books.</div>
        <MediaList :items="books"/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import MediaList from './MediaList.vue';

    const books = ref([]);
    const error = ref('');
    const loading = ref(true);

    async function fetchBooks() {
        loading.value = true;
        loading.error = '';

        try {
            const response = await fetch('http://localhost:3000/api/media');
            if (!response.ok) {
                throw new Error('Failed to fetch items.');
            }

            const data = await response.json();
            books.value = data.filter(item => item.type === 'books');
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    onMounted (() => {
        fetchBooks();
    })
</script>