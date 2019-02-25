<template>
  <q-page class="flex flex-center">
    <div class="row" style="width: 1140px; max-width: 90vw;">
      <div class="col-12 col-sm-6 col-md">
        <taxi_snippet></taxi_snippet>
      </div>

      <div class="col-12 col-sm-6 col-md">
        <q-card class="q-ma-sm">
          <q-card-media overlay-position="bottom"><img src="https://www1.urup.ru/images/minibus.jpg">
            <q-card-title slot="overlay">Маршрутки</q-card-title>
          </q-card-media>
          <q-card-main>
          </q-card-main>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md">
        <q-card class="q-ma-sm">
          <q-card-media overlay-position="bottom"><img src="https://www1.urup.ru/images/phonebook.jpg">
            <q-card-title slot="overlay">Организации</q-card-title>
          </q-card-media>
          <q-card-main>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import TaxiSnippet from 'components/taxi/TaxiSnippet.vue'

export default {
  name: 'PageIndex',
  components: {
    'taxi_snippet': TaxiSnippet
  }
}

</script>
