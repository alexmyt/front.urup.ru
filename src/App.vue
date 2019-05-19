<template>
  <div id="app">
    <template v-if="$auth.ready() && $auth.check() && loaded">
      <navbar></navbar>
      <main-search></main-search>
      <section id="content">
        <router-view></router-view>
      </section>
    </template>

    <template v-if="($auth.ready() && !$auth.check()) || !loaded">
      <router-view></router-view>
    </template>

  </div>
</template>

<script>
import "./styles/global.scss";

import Navbar from "./components/Navbar.vue";
import MainSearch from 'components/MainSearch.vue';
import { setTimeout } from 'timers';

export default {
  name: 'app',
  components: {
    'navbar': Navbar,
    'main-search': MainSearch,
  },

  data () {
    return {
      loaded: false,
    }
  },

  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.loaded = true;
    }, 1000);
  },

  created() {
  }
}
</script>