import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Pachinko from '../views/PachinkoPage.vue';
import Mines from '../views/MinesPage.vue';
import LuckyNumbers from '../views/LuckyNumbers.vue';
import WordlePage from '../views/WordlePage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/pachinko', name: 'Pachinko', component: Pachinko },
  { path: '/mines', name: 'Mines', component: Mines },
  { path: '/lucky', name: 'LuckyNumbers', component: LuckyNumbers },
  { path: '/wordle', name: 'Wordle', component: WordlePage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
