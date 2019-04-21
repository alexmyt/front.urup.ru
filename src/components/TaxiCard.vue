<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card border-secondary">
      <img class="card-img-top" src="~assets/taxi.jpg" alt="Такси в Урюпинске">
      <div class="card-header text-center">Службы такси</div>
      <div class="card-body">
        <div class="row no-gutters" v-for="taxi in taxiServices" :key="taxi.id">
          <div class="col col-auto pr-3">
            <router-link :to="'/transport/taxi/'+taxi.slug">{{taxi.name}}</router-link>
          </div>
          <div class="col text-right text-truncate">
            <span itemprop="telephone"><span v-html="taxi.phone_html"></span></span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="'/transport/taxi/'" class="card-link"> Все службы такси в городе</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TaxiCard',
  data () {
    return {
      taxiServices: []
    }
  },

  created () {
    this.axios.get('taxiServices')
    .then(response => {
      this.taxiServices = response.data.data;
    })

  }
}
</script>
