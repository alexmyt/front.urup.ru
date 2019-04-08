<template>
  <div class="container mb-5">
    <b-breadcrumb :items="breadcrumbs" />
    <pageHeader :headerText="organisation.name" :headerSub="category.name" />

    <div class="row">
      <div class="col-12 col-sm-6">
        <dl class="row"> 
          <dt class="col-sm-3">Адрес</dt>
          <dd class="col-sm-9" itemprop="address">{{address.address}}</dd>

          <dt class="col-sm-3">Телефоны</dt>
          <dd class="col-sm-9 d-flex flex-column">
            <phoneNumber class="w-100" v-for="contact in phones" :key="contact.id" :contact="contact"/>
          </dd>
          
          <template v-if="emails.length">
          <dt class="col-sm-3">E-Mail</dt>
          <dd v-for="contact in emails" class="col-sm-9 d-flex flex-column">
            <span><a :href="'mailto:'+contact.contact" itemprop="email">{{contact.contact}}</a></span>
          </dd>
          </template>

          <template v-if="urls.length">
          <dt class="col-sm-3">WWW</dt>
          <dd v-for="contact in urls" class="col-sm-9 d-flex flex-column">
            <span><a :href="contact.contact"  itemprop="url">{{contact.contact}}</a></span>
          </dd>
          </template>

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
      category: {},
      address: {},
      phones: [],
      emails: [],
      urls: [],
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
      this.category = response.data.categories[0];
      this.address = response.data.addresses[0];
      
      this.organisation.contacts.forEach(element => {
        switch(element.contact_type){
          case 'phone': 
            this.phones.push(element);
            break;
          case 'email':
            this.emails.push(element);
            break;
          case 'uri':
            this.urls.push(element);
            break;
        };
      });
    });
  },
}
</script>
