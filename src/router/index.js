import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Baby from '../views/Baby.vue';
import Album from '../views/Album.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/album',
        name: 'Album',
        component: Album
      },
      {
        path: '/',
        name: 'Baby',
        component: Baby
      },
      {
        path: '/admin',
        name: 'Admin',
        meta: {
          keep_alive: false
        },
        component: Admin
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
