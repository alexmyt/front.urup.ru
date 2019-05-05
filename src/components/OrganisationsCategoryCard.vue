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
    this.axios.get('organisations?card&count=5&category='+this.category)
    .then(response => {
      var organisations = response.data.data;
      var contacts = response.data.included;

      organisations.forEach(organisation => {
        
        organisation.attributes.id = organisation.id;
        organisation.attributes.contacts = [];

        if (organisation.relationships.contacts.data.length){
          var contact = contacts.find(function(element) {
            return element.id == this.relationships.contacts.data[0].id;
          }, organisation);

          if (contact){
            organisation.attributes.contacts.push(contact.attributes);
          }
        }

        this.organisations.push(organisation.attributes);
      });
    })

  }
}
</script>
