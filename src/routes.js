import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './pages/Index.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import TaxiService from './pages/TaxiService.vue';
import TaxiServices from './pages/TaxiServices.vue';
import Organisations from './pages/Organisations.vue';
import Organisation from './pages/Organisation.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Index },
    { path: '/login', name: 'login', component: LoginPage, meta: {forVisitors: true}},
    { path: '/register', name: 'register', component: RegisterPage, meta: {forVisitors: true} },
    { path: '/transport/taxi', name: 'taxiServices', component: TaxiServices },
    { path: '/transport/taxi/:id', name: 'taxiService', component: TaxiService },
    { path: '/organisations', name: 'organisations', component: Organisations },
    { path: '/organisations/:id', name: 'organisation', component: Organisation },
  ],
});

export default router;
