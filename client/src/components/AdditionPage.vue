<template>
    <div>
        <router-link to="/search">
            Search For New Item
        </router-link>
        <router-link to="/create">
            Create New Item
        </router-link>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;

    }
    
    div a {
        display: flex;
        justify-content: center;
        align-items: center;

        text-align: center;
        text-decoration: none;
        font-size: larger;
        
        background-color: #6785a3;
        color: aliceblue;
        border-radius: 20px;

        width: 320px;
        height: 200px;

        transition-duration: 0.4s;
    }

    div a:hover {
        background-color: #1e2934;
        color: azure;
    }
</style>