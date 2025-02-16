import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import HomeView from './views/Home.vue'
import SearchView from './views/Search.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
    props: (route: RouteLocationNormalized) => ({ query: route.query.query }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
