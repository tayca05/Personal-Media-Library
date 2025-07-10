import {createRouter, createWebHistory} from 'vue-router'

import Main from '../components/Main.vue';
import Movies from '../components/Movie.vue';
import Music from '../components/Music.vue';
import Books from '../components/Books.vue';
import Create from '../components/Create.vue';
import Search from '../components/Search.vue';
import Item from '../components/Item.vue';
import AdditionPage from '../components/AdditionPage.vue';

const routes = [
    {path: '/', component: Main},
    {path: '/movie', component: Movies},
    {path: '/music', component: Music},
    {path: '/books', component: Books},
    {path: '/create', component: Create},
    {path: '/search', component: Search},
    {path: '/item/:id', component: Item},
    {path: '/add', component: AdditionPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router