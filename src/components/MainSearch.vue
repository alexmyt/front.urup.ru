<template>
  <div class="container my-5">
    <div class="row">
      <cool-select 
        v-model="searchSelected"
        :items="searchItems" 
        :loading="loading"
        disable-filtering-by-search
        @search=onSearch 
        class="mx-auto main-search">

        <template slot="no-data">
          {{
            noData
              ? "Ничего не найдено"
              : "Введите не менее "+lettersLimit+" символов"
          }}
        </template>
        <template slot="item" slot-scope="{ item }">
          <div class="menu-item px-2 d-flex flex-column">
            <div><router-link :to="item.route">{{ item.title }}</router-link></div>
            <div>{{ item.subtitle }}</div>
          </div>
        </template>
      </cool-select>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select';

export default {
  name: 'MainSearch',
  components: {
    CoolSelect
  },
  data () {
    return {
      searchSelected: null,
      searchItems: [],
      noSearchData: false,
      loading: false,
      timeoutID: null,
      lettersLimit: 2,
      noData: false
    }
  },
  methods: {
    async onSearch(search) {
      this.noSearchData = false;

      if (search.length < this.lettersLimit) {
        this.searchItems = [];
        this.loading = false;
        return;
      }
      
      this.loading = true;

      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(async () => {
        const response = await this.axios.get('https://www1.urup.ru/api/search', {
          params: {
            q: search
          }
        });

        const res = await response;
        if(res.data.error) this.searchItems = [];
        else this.searchItems = res.data;
        
        this.loading = false;

        if(!this.searchItems.length) this.noData = true;

        //console.log(this.searchItems);
      },500);
    }
  }
}
</script>

<style lang="scss">
 .main-search{
  width: 85%;
 }
</style>