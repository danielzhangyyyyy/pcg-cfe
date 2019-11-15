import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, constructRouter } from '@/config/router.config'
const localRouter = localStorage.getItem('pcg__GET_MENU') ? JSON.parse(localStorage.getItem('pcg__GET_MENU')).value : null;
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(constructRouter(localRouter))
})