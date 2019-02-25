<template>
  <q-page class="flex flex-center">
    <div class="row" style="width: 1140px; max-width: 90vw;">
      <table class="row">
        <thead>
          <tr>
            <th></th>
            <th>Телефоны</th>
            <th>Посадка</th>
            <th>Цена за км.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="taxi in taxiServices" :key="taxi.id">
            <td>{{ taxi.name }}</td>
            <td></td>
            <td>{{taxi.priceGettingDay}}</td>
            <td>{{taxi.pricePerKmIncityDay}}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'TaxiServicesList',
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
