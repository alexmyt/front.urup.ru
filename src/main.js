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
Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);

Vue.use(YmapPlugin, {
  apiKey: '408aac5f-1a8e-4061-8f4e-6acf7fcc06fb',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
});
