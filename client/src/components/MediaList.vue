<template>
    <div class="media-list">
        <li v-for="item in filterItems" :key="item.id" class="media-item">
            <div class="media-image"></div> <!--Image PlaceHolder For Now-->
            <div class="media-details">
                <h3>{{ item.title }}</h3>
                <p>{{ item.genre }}</p>
                <p>{{ item.notes }}</p>
            </div>
        </li>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { defineProps } from 'vue';

    const props = defineProps({ // movie, music, books
        type: String
    })

    const allItems = ref([ // hardcoded data to test just for now
        { id: 1, title: 'Inception', type: 'movie' },
        { id: 2, title: 'Bohemian Rhapsody', type: 'music' },
        { id: 3, title: '1984', type: 'books' },
        { id: 4, title: 'Pride & Prejudice', type: 'books' }

    ])

    const filterItems = computed(() => {
        // filters item based on the type of the prop (movie, music, book)
        return allItems.value.filter(item => item.type === props.type); 
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