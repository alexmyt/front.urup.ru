<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import "./styles/global.scss";

import Navbar from "./components/Navbar.vue";
export default {
  name: 'app',
  components: {
    'navbar': Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>