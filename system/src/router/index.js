import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/StudentPageSide',
    name: 'StudentPageSide',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentPageSide.vue')
  },
  {
    path: '/StudentScorePage',
    name: 'StudentScorePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentScorePage.vue')
  },
  {
    path: '/StudentInfoPage',
    name: 'StudentInfoPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentInfoPage.vue')
  },
  {
    path: '/StudentWelcomePage',
    name: 'StudentWelcomePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentWelcomePage.vue')
  },
  {
    path: '/ScoreRetabulationPage',
    name: 'ScoreRetabulationPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ScoreRetabulationPage.vue')
  },
  {
    path: '/ClassSchedulePage',
    name: 'ClassSchedulePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClassSchedulePage.vue')
  },
  {
    path: '/ApplyExemptionPage',
    name: 'ApplyExemptionPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ApplyExemptionPage.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
