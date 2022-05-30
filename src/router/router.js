import Vue from 'vue'
import VueRouter from "vue-router";

import VCatalog from "@/components/v-catalog";
import VCart from "@/components/v-cart";

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: VCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: VCart,
            props: true
        }
    ]
})

export default router;

