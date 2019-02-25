<template>
  <q-card class="q-ma-sm">
    <q-card-media overlay-position="bottom"><img src="https://www1.urup.ru/images/taxi.jpg">
      <q-card-title slot="overlay">Службы такси</q-card-title>
    </q-card-media>
    <q-card-main>
      <div class=" row q-ma-none q-px-none q-py-xs justify-between" v-for="taxi in taxiServices" :key="taxi.id">
          <div class="card_link"><router-link :to="'/transport/taxi/'+taxi.slug">{{taxi.name}}</router-link></div>
          <div itemprop="telephone"><span v-html="taxi.phone_html"></span></div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
// import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default{
  name: 'TaxiSnippet',
  data () {
    return {
      taxiServices: []
    }
  },

  created () {
    this.$axios.get('https://www1.urup.ru/api/taxi')
      .then(response => {
        this.taxiServices = response.data
      })
  }
}
</script>

<style>
</style>
