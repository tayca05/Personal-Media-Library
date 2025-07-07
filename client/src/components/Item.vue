<template>
    <div>
        <div v-if="error">{{ error }}</div>
        <div v-else-if="loading"><Loading class=""></Loading></div>
        <div v-else class="item">
            <span>
                <img src="" alt="" class="item-image">
            </span>
            <div>
                <div class="item-info">
                    <h2>{{ item.title }}</h2> <!--Displaying current item-->
                    <p>{{ item.genre }}</p>
                    <p>{{ item.notes }}</p>
                    <p>Rating: {{ item.rating }}</p>
                </div>
                <div class="UD-buttons">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRoute();

    const id = route.params.id;
    const item = ref({});
    const loading = ref(true);
    const error = ref('');

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
        gap: 100px;
        align-items: center;
        justify-content: center;

        max-width: 800px;
        max-height: 400px;
    }

    .item-image {
        background-color: #333;
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
    }

    .UD-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>