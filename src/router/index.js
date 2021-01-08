import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import category from  '../views/category/home'
import list from  '../views/category/list'
import view from '../views/product/view'
import cart from '../views/shopping_cart/cart'
import login from '../views/login/home'
import register from '../views/login/ register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/category/list/:id',
    name: 'list',
    component: list
  },
  {
    path: '/product/view/:id',
    name: 'view',
    component: view
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },

]

const router = new VueRouter({
  linkExactActiveClass:"on",
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
