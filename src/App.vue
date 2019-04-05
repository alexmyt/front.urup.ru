<template>
  <div id="app">
    <navbar></navbar>
    <main-search></main-search>
    <section id="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import "./styles/global.scss";

import Navbar from "./components/Navbar.vue";
import MainSearch from 'components/MainSearch.vue';

export default {
  name: 'app',
  components: {
    'navbar': Navbar,
    'main-search': MainSearch,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>