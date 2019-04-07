<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card border-secondary">
      <img class="card-img-top" src="~assets/phonebook.jpg" alt="Организации Урюпинска">
      <div class="card-header text-center">Справочник организаций</div>
      <div class="card-body">
        <div class="row no-gutters" v-for="organisation in organisations" :key="organisation.id">
          <div class="col pr-3 text-truncate">
            <router-link :to="'/organisations/'+organisation.slug">{{organisation.name}}</router-link>
          </div>
          <div class="col col-auto text-right">
            <phoneNumber :contact='organisation.contacts[0]' />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="'/organisations'" class="card-link"> Полный справочник организаций</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneNumber from 'components/PhoneNumber.vue';

export default {
  name: 'OrganisationsCard',
  components: {
    'phoneNumber': PhoneNumber
  },
  data () {
    return {
      organisations: [],
    }
  },

  created () {
    this.axios.get('https://www1.urup.ru/api/organisation?card&count=5')
    .then(response => {
      this.organisations = response.data;
    })

  }
}
</script>
