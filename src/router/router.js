import { createRouter, createWebHistory } from 'vue-router'
import PachinkoPage from '../views/PachinkoPage.vue'
import HomePage from '../components/HomePage.vue' // import your home page component

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage // use your home page component here
  },
  {
    path: '/pachinko',
    name: 'pachinko',
    component: PachinkoPage
  },
  // other routes...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router