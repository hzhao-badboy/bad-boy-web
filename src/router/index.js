import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Baby from '../views/Baby.vue';
import Album from '../views/Album.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Album',
        component: Album
      },
      {
        path: '/baby',
        name: 'Baby',
        component: Baby
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
