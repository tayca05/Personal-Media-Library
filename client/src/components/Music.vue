<template>
    <div class="music-page">
        <h1>My Music</h1>

        <div v-if="error">{{ error }}</div>
        <div v-if="loading">Loading...</div>
        <div v-if="music && music.length === 0">Currently there is no logged in music.</div>
        <MediaList :items="music"/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import MediaList from './MediaList.vue';

    const music = ref([]);
    const loading = ref(true);
    const error = ref('');

    async function fetchMusic() {
        loading.value = true;
        error.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/media');
            if (!response.ok) {
                throw new Error('Failed to fetch items.');
            }

            const data = await response.json();
            music.value = data.filter(item => item.type === 'music');
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    onMounted (() => {
        fetchMusic();
    })
</script>