import { createRouter, createWebHistory } from 'vue-router'

import Klient from '@/components/Klient.vue'
import Kosmetolog from '@/components/Kosmetolog.vue'
import Usluga from '@/components/Usluga.vue'
import Seans from '@/components/Seans.vue'

const routes = [
    { path: '/klient', component: Klient },
    { path: '/kosmetolog', component: Kosmetolog },
    { path: '/usluga', component: Usluga },
    { path: '/seans', component: Seans }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router