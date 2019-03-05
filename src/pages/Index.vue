<template>

  <div>
    <div class="container my-5">
      <div class="row">
        <cool-select v-model="searchSelected" :items="searchItems" class="mx-auto main-search"></cool-select>
      </div>
    </div>

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

export default {
  name: 'SiteIndex',
  components: {
    'taxi_card': TaxiCard,
    CoolSelect
  },
  data () {
    return {
      searchSelected: null,
      searchItems: ["one","two","three"]
    }
  }
}
</script>

<style lang="scss">
 .main-search{
  width: 85%;
 }

</style>
