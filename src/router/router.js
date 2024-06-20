import { createRouter, createWebHistory } from 'vue-router';
import PachinkoPage from '../views/PachinkoPage.vue';
import MinesPage from '../views/MinesPage.vue';
import HomePage from '../components/HomePage.vue';
import LuckyNumbers from '../views/LuckyNumbers.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/pachinko',
    name: 'pachinko',
    component: PachinkoPage
  },
  {
    path: '/mines',
    name: 'mines',
    component: MinesPage
  },
  {
    path: '/lucky',
    name: 'lucky',
    component: LuckyNumbers
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
