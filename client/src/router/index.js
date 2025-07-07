import {createRouter, createWebHistory} from 'vue-router'

import Main from '../components/Main.vue';
import Movies from '../components/Movie.vue';
import Music from '../components/Music.vue';
import Books from '../components/Books.vue';
import Create from '../components/Create.vue';

const routes = [
    {path: '/', component: Main},
    {path: '/movies', component: Movies},
    {path: '/music', component: Music},
    {path: '/books', component: Books},
    {path: '/create', component: Create}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router