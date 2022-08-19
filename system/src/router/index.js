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
  {
    path: '/ExamSchedulePage',
    name: 'ExamSchedulePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ExamSchedulePage.vue')
  },
  {
    path: '/RetakeExamPage',
    name: 'RetakeExamPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/RetakeExamPage.vue')
  },
]

const router = new VueRouter({
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' 
  || to.path==='/' 
  || to.path==='/register'
  || to.path==='/license'
  || to.path==='/forgetPassword'
  ) {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      //打开登录界面
      startLogin();
      //前往首页
      //this.$router.replace('/');

      
    } else {
      next();
    }
  }
});

export default router
