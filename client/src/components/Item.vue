<template>
    <div>
        <div v-if="error">{{ error }}</div>
        <div v-else-if="loading"><Loading class=""></Loading></div>
        <div v-else class="item">
            <div  class="poster-info">
                <span v-if="item.type === 'movie' || item.type === 'books'">
                    <img :src="resolveURL(item.image)" alt="" class="movie-item">
                </span>
                <span v-if="item.type === 'music'">
                    <img :src="resolveURL(item.image)" alt="" class="music-item">
                </span>
                <div class="item-details">
                    <div v-if="!edit && (item.type === 'movie' || item.type === 'books')" class="item-info">
                        <h2>{{ item.title }}</h2> <!--Displaying current item-->
                        <p>Genre: {{ item.genre }}</p>
                        <p>Notes: {{ item.notes }}</p>
                        <p>Rating: {{ item.rating }}</p>
                    </div>  
                    <div v-if="!edit && (item.type === 'music')" class="music-info">
                        <h2>{{ item.title }}</h2> <!--Displaying current item-->
                        <p>Genre: {{ item.genre }}</p>
                        <p>Notes: {{ item.notes }}</p>
                        <p>Rating: {{ item.rating }}</p>
                    </div>  
                    <div v-if="edit" class="item-info">
                        <h2 class="edit-row">
                            <label for="">Title:</label>
                            <input v-model="item.title" placeholder="Title"/>
                        </h2> 
                        <p class="edit-row">
                            <label for="">Genre:</label>
                            <input v-model="item.genre" placeholder="Genre" class="row"/>
                        </p>
                        <p class="edit-row">
                            <label for="">Notes:</label>
                            <textarea v-model="item.notes" placeholder="Notes" class="row"></textarea>
                        </p>
                        <p class="edit-row">
                            <label for="">Rating:</label>
                            <input v-model.number="item.rating" type="number" min="1" max="5" class="row"/>
                        </p>
                    </div>
                    <div class="UD-buttons">
                        <button @click="goBack()">Go Back</button>
                        <button v-if="edit" @click="updateItem">Save</button>
                        <button v-else @click="startEditing()">Edit</button>
                        <button v-if="edit" @click="cancelEdit">Cancel</button>
                        <button @click="deleteItem()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const id = route.params.id;
    const item = ref({});
    const loading = ref(true);
    const error = ref('');
    const edit = ref(false);
    let ogItem = null;

    onMounted (async() => {
        try {
            const response = await fetch(`http://localhost:3000/api/media/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch item.');
            }

            item.value = await response.json();
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    })   

    async function startEditing() {
        ogItem = JSON.parse(JSON.stringify(item.value));
        edit.value = true;
    }

    async function cancelEdit() {
        if (ogItem) {
            item.value = JSON.parse(JSON.stringify(ogItem));
        }
        edit.value = false;
    }

    async function deleteItem() {
        try {
            const response = await fetch(`http://localhost:3000/api/media/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete item.');
            }
            router.push(`/${item.value.type}`); // go back to main page
        } catch (err) {
            error.value = err.message;   
        }
    }

    async function updateItem() {
        try {
            const response = await fetch(`http://localhost:3000/api/media/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item.value)
            });

            if (!response.ok) {
                throw new Error('Failed to update items.')
            }

            edit.value = false;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    async function goBack() {
        router.push(`/${item.value.type}`); // go back to main page
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

<style>
    .poster-info {
        padding: 2rem;
        padding-bottom: 2rem;
        margin: 0;
        background-color: aliceblue;
        border-radius: 20px;
        color: #333;

        display: flex;
        gap: 4rem;
        align-items: flex-start;
        justify-content: center;

        max-width: 800px;
        max-height: 600px;
    }

    .movie-item {
        width: 320px;
        height: 450px;
    }

    .music-item {
        width: 320px;
        height: 320px;
    }

    .item-info {
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 20px;
        background-color: #3c4e61;
        color: aliceblue;
        text-align: left;

        width: 320px;
        height: 450px;

        overflow-y: auto;
    }

    .music-info {
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 20px;
        background-color: #3c4e61;
        color: aliceblue;
        text-align: left;

        width: 320px;
        height: 320px;

        overflow-y: auto;
    }

    .UD-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
    }

    .edit-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }

    .edit-row label {
        font-weight: bold;
    }

    .edit-row input {
        width: 200px;
        background-color: #1e2a36;
        border: #1e2a36;
        border-radius: 5px;
        padding: 0.2rem;
        margin: 0;
    }

    .edit-row textarea {
        
        height: 200px;
        width: 200px;
        background-color: #1e2a36;
        border: #1e2a36;
        border-radius: 5px;
    
    }
</style>