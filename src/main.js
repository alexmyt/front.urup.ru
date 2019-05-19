import axios from 'axios';
import VueAxios from 'vue-axios';
import YmapPlugin from 'vue-yandex-maps';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueSelect from 'vue-cool-select';
import Notifications from 'vue-notification';
import Vue from 'vue';
import Router from './routes';

import App from './App.vue';
import i18n from './i18n'

Vue.use(VueSelect, {
  theme: 'bootstrap', // "bootstrap" or 'material-design'
});

Vue.use(Notifications);

axios.defaults.baseURL = 'https://www1.urup.ru/api/';
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}
axios.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    var errorText = '';
    if (error.response){
      if (error.response.data.message){
        errorText = error.response.data.message;
      }

      if (error.response.data.error){
        errorText = error.response.data.error;
      }
    }

      Vue.notify({
        type: 'error',
        text: errorText,
      });
    return Promise.reject(error);
  }
);
Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);
Vue.use(Vuelidate);

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
  parseUserData: function (data){
    var result = {id: data.data.id};
    Object.assign(result,data.data.attributes);
    return result;
  }
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
  i18n,
  router: Router
});
