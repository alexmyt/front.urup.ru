<template>
  <header class="pageHeader my-4 pb-0">
    <h1><span itemprop="name">{{headerText}}</span>
      <small v-if="headerSub" itemprop="disambiguatingDescription"
        class="text-muted d-flex flex-column ml-4 mt-1">{{headerSub}}</small>
    </h1>
    <div class="shareIcons ml-auto">
      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+ url" target="_blank" title="Поделиться в FB">
        <img src="~assets/icons/facebook.svg" height="25" width="25">
      </a>

      <img src="~assets/icons/vk.svg" height="25" width="25">
      <img src="~assets/icons/ok.svg" height="25" width="25">
    </div>
  </header>
</template>

<script>
  export default {
    name: 'PageHeader',
    props: ['headerText','headerSub'],
    data () {
      return {
        url: ''
      }
    },
    created () {
      const vm = this;
      let path = vm.$route.path;
      if (vm.$router.mode === 'hash') {
        if (vm.$router.history.hashbang) {
          path = '!' + path;
        }
        path = '#' + path;
      }
      // finally we add the absolute prefix before that
      if (path[0] === '#') {
        // hash mode join
        path = location.origin + location.pathname 
             + (location.query||'') + path;
      } else if(path[0] === '/') {
        // absolute path
        path = location.origin + path;
      } else {
        // relative path
        path = location.origin + location.pathname.replace(/\/[^\/]+$/, '/') + path;
      }

      this.url = path;
 
    },
  }

</script>

<style lang="scss">
@import "~styles/variables";

.pageHeader{
  margin-top: 2em;
  padding-bottom: 1rem;
  display: flex;
  border-bottom: 1px solid #b7b7b7;
  
  h1 {
    font-family: Roboto,sans-serif;
    &:before {
      position: relative;
      top: -1px;
      float: left;
      width: 1.5rem;
      content: "\3009";
      font-family: arial;
      color: $business-bg;
    }
    
    small{
      font-size: 60%;
    }
  }
  
  .shareIcons{
    font-size: 1.55rem;
  }
}

</style>
