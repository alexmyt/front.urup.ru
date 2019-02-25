<template>
  <q-page class="flex flex-center">
    <div class="row">
      <h1>{{taxiService.name}}<div class="q-title">Служба такси</div></h1>
    </div>
    <div class="row">

    </div>
  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'TaxiService',
  data () {
    return {
      taxiService: []
    }
  },

  created () {
    this.$axios.get('https://www1.urup.ru/api/taxi/' + this.$route.params.slug)
      .then(response => {
        this.taxiService = response.data
      })
  }
}

</script>
