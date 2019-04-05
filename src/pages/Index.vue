<template>
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
</template>

<script>
import TaxiCard from 'components/TaxiCard.vue';

export default {
  name: 'SiteIndex',
  components: {
    'taxi_card': TaxiCard,
  },
  data () {
    return {
    }
  },
}
</script>
