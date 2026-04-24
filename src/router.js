import { createRouter, createWebHistory } from 'vue-router'

import Klient from '@/components/Klient.vue'
import Kosmetolog from '@/components/Kosmetolog.vue'
import Usluga from '@/components/Usluga.vue'
import Seans from '@/components/Seans.vue'
import CreateUsluga from '@/components/CreateUsluga.vue'

const routes = [
    { path: '/klient', component: Klient },
    { path: '/klient/:id', component: Klient },

    { path: '/kosmetolog', component: Kosmetolog },
    { path: '/usluga', component: Usluga },
    { path: '/seans', component: Seans },
    { path: '/createusluga', component: CreateUsluga },
    { path: '/', redirect: '/klient' }
]

export default createRouter({
    history: createWebHistory(),
    routes
})