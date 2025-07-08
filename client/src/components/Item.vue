<template>
    <div>
        <div v-if="error">{{ error }}</div>
        <div v-else-if="loading"><Loading class=""></Loading></div>
        <div v-else class="item">
            <span>
                <img :src="`http://localhost:3000/${item.image}`" alt="" class="item-image">
            </span>
            <div class="item-details">
                <div class="item-info">
                    <h2>{{ item.title }}</h2> <!--Displaying current item-->
                    <p>{{ item.genre }}</p>
                    <p>{{ item.notes }}</p>
                    <p>Rating: {{ item.rating }}</p>
                </div>
                <div class="UD-buttons">
                    <button @click="updateItem()">Update</button>
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
    const edit = ref(false)

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
</script>

<style>
    .item {
        padding: 2rem;
        margin: 2rem;
        width: 800px;
        height: 400px;
        padding: 1rem;
        background-color: aliceblue;
        border-radius: 20px;
        color: #333;

        display: flex;
        gap: 4rem;
        align-items: center;
        justify-content: center;

        max-width: 800px;
        max-height: 400px;
    }

    .item-image {
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
    }

    .UD-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }
</style>