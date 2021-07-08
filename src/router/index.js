import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

//Components
import Dialog from "@/components/Dialog";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/project/:project_name',
        name: 'Project',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: { default: Home, project: Dialog },
    }
]

const router = new VueRouter({routes, linkExactActiveClass: "active", mode: "history"})

export default router
