import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import CarDetail from '../components/CarDetail.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/', redirect: '/home'},
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/carDetail/:id',
    name: 'CarDetail',
    component: CarDetail
  }

]

const router = new VueRouter({
  routes
})

export default router
