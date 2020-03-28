import Vue from 'vue'
import VueRouter from 'vue-router'

import Entrada from '@/views/Financeiro/Entrada.vue'
import Saida from '@/views/Financeiro/Saida.vue'
import Devolucao from '@/views/Financeiro/Devolucao.vue'

import Home from '@/views/Home.vue'
import Dev from '@/views/Dev.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Testes',
    component: Dev
  },
  {
    path: '/entrada',
    name: 'Entrada',
    component: Entrada
  },
  {
    path: '/saida',
    name: 'Saida',
    component: Saida
  },
  {
    path: '/devolucao',
    name: 'Devolução',
    component: Devolucao
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
