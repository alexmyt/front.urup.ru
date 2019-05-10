import YmapPlugin from 'vue-yandex-maps';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSelect from 'vue-cool-select';
import Vue from 'vue';
import Router from './routes';

import App from './App.vue';

Vue.use(VueSelect, {
  theme: 'bootstrap', // "bootstrap" or 'material-design'
});

axios.defaults.baseURL = 'https://www1.urup.ru/api/';
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}
Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);

Vue.use(YmapPlugin, {
  apiKey: '408aac5f-1a8e-4061-8f4e-6acf7fcc06fb',
});

// Authenticate plugin
Vue.router = Router;  // need for vue-auth
Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  fetchData: {url: 'user'},
  refreshData: {url: 'user'},
});

// Hooks for disable access all pages without authenticate
Router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.check()) {
        next('/');
      } else next();
    
    } else {
      if (! Vue.auth.check()){
        next('/login');
      } else next();
    };
  }
);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
});
