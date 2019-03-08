<template>

  <div>
    <main-search></main-search>

    <section id="content">
      <div class="container">
        <div class=row>
          
          <taxi_card></taxi_card>
      
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card border-secondary">
              <img class="card-img-top" src="~assets/minibus.jpg" alt="Общественный транспорт Урюпинска">
              <div class="card-header text-center">Маршрутки</div>
              <div class="card-body"></div>
              <div class="card-footer"><a href="#" class="card-link">Весь общественный транспорт</a></div>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TaxiCard from 'components/TaxiCard.vue';
import { CoolSelect } from 'vue-cool-select';
import MainSearch from 'components/MainSearch.vue';

export default {
  name: 'SiteIndex',
  components: {
    'taxi_card': TaxiCard,
    'main-search': MainSearch,
    CoolSelect
  },
  data () {
    return {
      searchSelected: null,
      searchItems: [],
      noSearchData: false,
      loading: false
    }
  },
  methods: {
    async onSearch(search) {
      const lettersLimit = 2;
      this.noSearchData = false;

      if (search.length < lettersLimit) {
        this.searchItems = [];
        this.loading = false;
        return;
      }
      this.loading = true;
    }
  }
}
</script>
