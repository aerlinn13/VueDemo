import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home.vue'
import Team from '../pages/Team.vue'
import Player from '../pages/Player.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/team/:id',
      name: 'Team',
      component: Team
    },
    {
      path: '/player/:id',
      name: 'Player Statistics',
      component: Player
    }
  ]
})

export default router
