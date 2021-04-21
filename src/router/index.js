import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import CompanySetup from '../views/CompanySetup.vue'
import BalanceSheet from '../views/report/BalanceSheet.vue'
import Investment from '../views/report/Investment.vue'

Vue.use(Router)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
      path: '/dashboard/:cid',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/company-setup',
      name: 'CompanySetup',
      component: CompanySetup
    },
    {
      path: '/balance-sheet/:cid',
      name: 'BalanceSheet',
      component: BalanceSheet
    },
    {
      path: '/investment/:cid',
      name: 'Investment',
      component: Investment
    },
  ]
})
