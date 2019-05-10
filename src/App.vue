<template>
  <div id="app">
    <template v-if="$auth.check()">
      <navbar></navbar>
      <main-search></main-search>
      <section id="content">
        <router-view></router-view>
      </section>
    </template>

    <template v-if="! $auth.check()">
      <router-view></router-view>
    </template>

  </div>
</template>

<script>
import "./styles/global.scss";

import Navbar from "./components/Navbar.vue";
import MainSearch from 'components/MainSearch.vue';
import LoginPage from './pages/Login.vue';

export default {
  name: 'app',
  components: {
    'navbar': Navbar,
    'main-search': MainSearch,
    'login-page': LoginPage,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>