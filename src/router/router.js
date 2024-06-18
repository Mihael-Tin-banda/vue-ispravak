import { createRouter, createWebHistory } from 'vue-router';
import PachinkoPage from '../views/PachinkoPage.vue';
import MinesPage from '../views/MinesPage.vue';
import HomePage from '../components/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../components/DashboardPage.vue';  // Ažurirana putanja i naziv

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
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage  // Ažurirana komponenta
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;