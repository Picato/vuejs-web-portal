import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from '@/view/PageNotFound'
import ZoneRoutes from './zones.routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...ZoneRoutes,
    { path: '*', component: PageNotFound }
  ]
})
