import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import ListEvents from '../../modules/events/adapters/views/ListEvents.vue'
import ListUnits from '../../modules/units/adapters/views/ListUnits.vue'
import ConsultUnitsBd from '../../modules/units/adapters/views/ConsultUnitsBd.vue'
import App from '../../App.vue'

//Configurar Rutas Navegación
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'events'
  },
  {
    path: '/home',
    name: 'home',
    component:HomeView,
    children: [
      {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "about" */ '../../modules/events/adapters/views/ListEvents.vue')
    
      },
      {
        path: '/units',
        name: 'units',
        component: ListUnits
      },
      {
        path: '/report',
        name: 'report',
        component: ConsultUnitsBd
      },
    ] 
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
