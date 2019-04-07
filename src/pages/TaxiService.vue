<template>
  <b-container itemscope itemtype="http://schema.org/Organization">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <pageHeader :headerText='taxiService.name' headerSub='Служба такси'></pageHeader>
    <b-row>
      
      <b-col>
        <h4>Тарифы</h4>
          <table class="table table-sm">
            <tbody>
                <tr>
                  <th scope="row">Цена за посадку:</th>
                  <td>{{taxiService.priceGettingDay}} (день)<br>{{taxiService.priceGettingNight}} (ночь)</td>
                </tr>
                <tr>
                  <th scope="row">Цена за км:</th>
                  <td>{{taxiService.pricePerKmIncityDay}} (день)<br>{{taxiService.pricePerKmIncityNight}} (ночь)</td>
                </tr>
                <tr>
                  <th scope="row">Цена за км (за городом):</th>
                  <td>{{taxiService.pricePerKmOutcityDay}} (день)<br>{{taxiService.pricePerKmOutcityNight}} (ночь)</td>
                </tr>
            </tbody>
          </table>
      </b-col>
      
      <b-col d-flex flex-column>
        <h4>Телефоны</h4>
        <phoneNumber class="w-100" v-for="contact in taxiService.contacts" :key="contact.id" :contact="contact"/>
      </b-col>
      
      <b-col cols="12" lg="4">
        <h4>Примерная стоимость поездки</h4>
      </b-col>
    </b-row>
    <p>{{taxiService.description}}</p>
  </b-container>
</template>

<script>
import PageHeader from 'components/PageHeader.vue';
import PhoneNumber from 'components/PhoneNumber.vue';

export default {
  components:{
    'pageHeader': PageHeader,
    'phoneNumber': PhoneNumber,
  },

  data () {
    return {
      taxiService: [],
      breadcrumbs: [
        { text: 'Главная', to: {name: 'home' }},
        { text: 'Службы такси', to: {name: 'taxiServices'}},
      ]
    }
  },

  created () {
    this.axios.get('https://www1.urup.ru/api/taxi/'+this.$route.params.id)
    .then(response => {
      this.taxiService = response.data;
      this.breadcrumbs.push({text: response.data.name, href: '#' });
    })
  }
}
</script>
