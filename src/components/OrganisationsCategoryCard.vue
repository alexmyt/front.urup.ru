<template>
  <b-card :header="header">
    <div class="row no-gutters" v-for="organisation in organisations" :key="organisation.id">
      <div class="col pr-3 text-truncate">
        <router-link :to="'/organisations/'+organisation.slug">{{organisation.name}}</router-link>
      </div>
      <div class="col col-auto text-right">
        <phoneNumber :contact='organisation.contacts[0]' />
      </div>
    </div>
  </b-card>
</template>

<script>
import PhoneNumber from 'components/PhoneNumber.vue';

export default {
  name: 'OrganisationsCard',
  props: ['category','header','icon'],
  components: {
    'phoneNumber': PhoneNumber
  },
  data () {
    return {
      organisations: [],
    }
  },

  created () {
    this.axios.get('https://www1.urup.ru/api/organisation?card&count=5&category='+this.category)
    .then(response => {
      this.organisations = response.data;
    })

  }
}
</script>
