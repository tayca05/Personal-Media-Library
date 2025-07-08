<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/movie">Movies</router-link>
      <router-link to="/music">Music</router-link>
      <router-link to="/books">Books</router-link>

      <router-link to="/create" class="create">Add New Media Item</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showform = ref(false);
</script>

<style>
.navbar {
  background-color: #3c4e61;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  transition-duration: 0.4s;
}

.navbar:hover {
  background-color: #3c4e61;
}

.navbar a {
  margin: 2rem;
  color: rgb(176, 195, 211);
  font-size: larger;
  cursor: pointer;
  
  transition-duration: 0.4s;
}

.navbar a:hover {
  color: white;
}

.navbar .create {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1rem;

  background-color: #2c3e50;
  border-color: #3c4e61;
  border-radius: 9px;
  width: 250px;


}

h1 {
  padding: 0;
  margin: 0;
  color: rgb(255, 255, 255);
}

button {
  margin-top: 3rem;
}

body {
  background-color: #2c3e50;
  color: white;
}
</style>

