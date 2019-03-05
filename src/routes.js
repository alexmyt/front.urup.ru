import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Index
        }
    ]
})

export default router