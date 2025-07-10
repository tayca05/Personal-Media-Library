<template>
    <div>
        <div v-if="error">{{ error }}</div>
        <div v-else-if="loading"><Loading class=""></Loading></div>
        <div v-else class="item">
            <span v-if="item.type === 'movie' || item.type === 'books'">
                <img :src="resolveURL(item.image)" alt="" class="movie-item">
            </span>
            <span v-if="item.type === 'music'">
                <img :src="resolveURL(item.image)" alt="" class="music-item">
            </span>
            <div class="item-details">
                <div v-if="!edit" class="item-info">
                    <h2>{{ item.title }}</h2> <!--Displaying current item-->
                    <p>Genre: {{ item.genre }}</p>
                    <p>Notes: {{ item.notes }}</p>
                    <p>Rating: {{ item.rating }}</p>
                </div>   
                <div v-if="edit" class="item-info">
                    <h2><input v-model="item.title" placeholder="Title" /></h2> 
                    <p><input v-model="item.genre" placeholder="Genre" /></p>
                    <p><textarea v-model="item.notes" placeholder="Notes"></textarea></p>
                    <p><input v-model.number="item.rate" type="number" min="1" max="5" /></p>
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
    .item {
        padding: 2rem;
        margin: 2rem;
        width: 800px;
        height: 500px;
        padding: 1rem;
        background-color: aliceblue;
        border-radius: 20px;
        color: #333;

        display: flex;
        gap: 4rem;
        align-items: center;
        justify-content: center;

        max-width: 800px;
        max-height: 500px;
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
        padding: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 20px;
        background-color: #3c4e61;
        color: aliceblue;
        text-align: left;

        width: 320px;
        height: 200px;

        overflow-y: auto;
    }

    .UD-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }
</style>