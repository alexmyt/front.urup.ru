import Vue from 'vue'
import App from './App.vue'

import Router from './routes.js'

import VueSelect from "vue-cool-select";
Vue.use(VueSelect, {
  theme: "bootstrap" // "bootstrap" or 'material-design'
});

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
})
