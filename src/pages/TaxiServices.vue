<template>
  <div class="container">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <pageHeader headerText='Службы такси'></pageHeader>

    <b-table 
      striped 
      hover 
      responsive="sm" 
      head-variant="light"
      :items="taxiServices" 
      :fields="fields" >
      
      <template slot="name" slot-scope="data">
        <router-link :to="'/transport/taxi/'+data.item.slug">{{data.item.name}}</router-link>
      </template>
      <template slot="phones" slot-scope="data">
        <phone-number v-for="contact in data.item.contacts" :key="contact.id" :contact="contact"/>
      </template>
    </b-table>

  </div>
</template>

<script>
import PageHeader from 'components/PageHeader.vue';
import PhoneNumber from 'components/PhoneNumber.vue';

export default {
  components:{
    'pageHeader': PageHeader,
    'phone-number': PhoneNumber
  },
  
  data () {
    return {
      taxiServices: [],
      breadcrumbs: [
        { text: 'Главная', to: {name: 'home' }},
        { text: 'Службы такси', to: {name: 'taxiServices'}},
      ],
      fields:{
        name: {
          label: 'Служба',
          isRowHeader: true,
          class: "w-50",
        },
        phones: {
          label: 'Номера телефонов',
          class: "d-flex flex-column"
        },
        priceSeat: {
          key: "priceGettingDay",
          label: "Посадка"
        },
        pricePerKm: {
          key: "pricePerKmIncityDay",
          label: "Цена за км."
        }
      }
    }
  },
  
  created () {
    this.axios.get('https://www1.urup.ru/api/taxi')
    .then(response => {
      this.taxiServices = response.data
    })
  }
}
</script>
