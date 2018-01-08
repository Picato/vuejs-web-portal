import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from '@/view/PageNotFound'
import Login from '@/view/Login'
import ZoneRoutes from './zones.routes'
import Auth from '@/providers/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    ...ZoneRoutes,
    { path: '/login', component: Login },
    { path: '*', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    Auth.ping().then(next).catch(() => next({
      path: '/login',
      query: { redirect: to.fullPath }
    }))
  } else {
    next()
  }
})

export default router
