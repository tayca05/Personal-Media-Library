<template>
    <div class="media-list">
        <li v-for="item in items" :key="item._id" class="media-item">
            <div class="media-image"></div> <!--Image PlaceHolder For Now-->
            <div class="media-details">
                <router-link :to="`/item/${item._id}`">
                    <h3>{{ item.title }}</h3>
                </router-link>
                <p>{{ item.genre }}</p>
                <p>{{ item.notes }}</p>
            </div>
        </li>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({ // movie, music, books
        items: Array
    })
</script>

<style>
.media-list {
    display: grid;
    gap: 50px;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
}

.media-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    text-align: center;
    width: 150px;
}

.media-image {
    width: 100px;
    height: 100px;
    background-color: #565656;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
}

.media-details {
    flex: 1;
    text-align: center;
}

.media-details h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
}

.media-details h3:hover {
    text-decoration: underline;
}

.media-details p {
    margin: 0.2rem 0;
    color: #666;
}

.movie-page h1 {
    margin-bottom: 3rem;
}

.music-page h1 {
    margin-bottom: 3rem;
}

.books-page h1 {
    margin-bottom: 3rem;
}
</style>