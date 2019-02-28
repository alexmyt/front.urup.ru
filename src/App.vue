<template>
  <div id="app">
    <navbar></navbar>
  </div>
</template>

<script>
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

<style>
</style>
