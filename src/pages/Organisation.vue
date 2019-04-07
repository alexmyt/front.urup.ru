<template>
  <div class="container mb-5">
    <b-breadcrumb :items="breadcrumbs" />
    <pageHeader :headerText="organisation.name" :headerSub="organisation.categories[0].name" />

    <div class="row">
      <div class="col-12 col-sm-6">
        <dl class="row"> 
          <dt class="col-sm-3">Адрес</dt>
          <dd class="col-sm-9" itemprop="address">{{organisation.addresses[0].address}}</dd>

          <dt class="col-sm-3">Телефоны</dt>
          <dd class="col-sm-9 d-flex flex-column">
            <phoneNumber class="w-100" v-for="contact in phones" :key="contact.id" :contact="contact"/>
          </dd>
          

        </dl>

      </div>
    </div>
  </div>
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
      organisation: [],
      breadcrumbs: [
        { text: 'Главная', to: {name: 'home' }},
        { text: 'Организации', to: {name: 'organisations'}},
      ]
    }
  },

  created () {
    this.axios.get('https://www1.urup.ru/api/organisation/'+this.$route.params.id)
    .then(response => {
      this.organisation = response.data;
      this.breadcrumbs.push({text: response.data.name, href: '#' });
    })
  },

  computed:{
    phones: function() {
      return this.organisation.contacts.filter( function(contact){
        return contact.contact_type == 'phone';
      });
    },

  }
}
</script>
