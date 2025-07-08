<template>
    <form @submit.prevent="submitForm" class="container">
        <h1>Create a new media item.</h1>
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
        <div class="row">
            <label for="title">Enter Title:</label>
            <input type="text" v-model="title" required>
        </div>
        <div class="row">
            <label for="genre">Enter Genre:</label>
            <input type="text" v-model="genre">
        </div>
        <div class="row">
            <label for="rate">Enter Rating:</label>
            <input type="number" min="1" max="5" v-model="rate">
        </div>
        <div class="row" id="notes-container">
            <label for="notes">Enter Notes:</label>
            <textarea type="text" id="notes" v-model="notes"></textarea>
        </div>
        <div class="row">
            <label for="image">Choose an image:</label>
            <input type="file" @change="handleImage">
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import router from '../router';

    const type = ref('');
    const title = ref('');
    const genre = ref('');
    const rate = ref('');
    const notes = ref('');
    const image = ref(null);

    const success = ref(false);
    const err = ref('');

    async function submitForm() {
        success.value = false;
        err.value = '';

        try {
            const form = new FormData();
            form.append('image', image.value);
            form.append('type', type.value);
            form.append('title', title.value);
            form.append('genre', genre.value);
            form.append('rating', rate.value);
            form.append('notes', notes.value);

            const response = await fetch('http://localhost:3000/api/media', {
                method: 'POST',
                body: form
            });

            // check if response status, whether it is between 200-299
            if (!response.ok) {
                throw new Error("Failed to add item.");
            }

            router.push(`/${type.value}`);

            success.value = true;
            type.value = '';
            title.value = '';
            genre.value = '';
            rate.value = ''; // default rate
            notes.value = '';


        } catch (error) {
            err.value = error.message;
        }
    }

    async function handleImage(event) {
        image.value = event.target.files[0];
    }
</script>

<style scoped>
    .container {
        max-width: 600px;
        padding: 1rem;
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .row input {
        width: 350px;
        background-color: #1e2a36;
        border: #1e2a36;
        border-radius: 5px;
    }

    .type-row {
        margin-top: 2rem;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .buttons {
        display: flex;                 
        gap: 89px;
    }

    .type-button input {
        color: aliceblue;
    }

    #notes {
        height: 200px;
        width: 350px;
        background-color: #1e2a36;
        border: #1e2a36;
        border-radius: 5px;
    }

    h1 {
        margin-bottom: 0;
    }
</style>