import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './pages/Index.vue';
import TaxiService from './pages/TaxiService.vue';
import TaxiServices from './pages/TaxiServices.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Index },
    { path: '/transport/taxi', name: 'taxiServices', component: TaxiServices },
    { path: '/transport/taxi/:id', name: 'taxiService', component: TaxiService },
  ],
});

export default router;
