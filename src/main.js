import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Router from './routes.js'

import VueSelect from "vue-cool-select";
Vue.use(VueSelect, {
  theme: "bootstrap" // "bootstrap" or 'material-design'
});

Vue.use(VueAxios,axios)

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
})
