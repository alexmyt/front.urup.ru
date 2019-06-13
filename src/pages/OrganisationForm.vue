<template>
  <div class="container mb-5 pb-5">
    <PageHeader :headerText="pageHeaderText" :headerSub="pageHeaderSub"/>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-organisation-name"
        label-cols-lg="2"
        :label="$t('organisation.form.name')"
        label-for="organisation-name"
        
      >
        <b-form-input
          id="organisation-name"
          v-model="organisation.name"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-short-name"
        label-cols-lg="2"
        :label="$t('organisation.form.shortName')"
        label-for="organisation-short-name"
      >
        <b-form-input
          id="organisation-short-name"
          v-model="organisation.shortName"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-description"
        label-cols-lg="2"
        :label="$t('organisation.form.description')"
        label-for="organisation-description"
      >
        <b-form-textarea
          id="organisation-description"
          v-model="organisation.descriprion"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-slug"
        label-cols-lg="2"
        :label="$t('organisation.form.slug')"
        label-for="organisation-slug"
      >
        <b-form-input
          id="organisation-slug"
          v-model="organisation.slug"
        />
      </b-form-group>

      <b-card bg-variant="light">
        <b-form-group
          label="Контакты"
          label-cols-lg="2"
          label-size="lg"
        >

          <template v-for="contact in organisation.contacts">
            <b-input-group class="my-1">
              <b-col sm="auto">
                <b-form-select v-model="contact.contact_type" :options="contactSelectOptions"></b-form-select>
              </b-col>
              <b-col>
                <b-form-input id="contact-contact" required v-model="contact.contact" :placeholder="$t('contact.form.'+contact.contact_type+'Contact')"/>
              </b-col>
              <b-col v-if="contact.contact_type != 'uri'">
                <b-form-input id="contact-description" v-model="contact.description" :placeholder="$t('contact.form.description')"/>
              </b-col>
              <b-col col cols="2" class="text-right">
                  <b-btn variant="primary" 
                    @click="addContact" 
                    v-if="organisation.contacts.indexOf(contact) == (organisation.contacts.length - 1)">
                    <i class="fas fa-plus-circle"></i></b-btn>
                  
                  <b-btn variant="outline-danger" 
                    @click="removeContact(contact)"
                    v-if="organisation.contacts.length > 1">
                    <i class="fas fa-ban"></i></b-btn>

              </b-col>
            </b-input-group>
          </template>
        </b-form-group>
      </b-card>

      <b-button type="submit" variant="primary">{{this.$t('submit')}}</b-button>
      <b-button variant="secondary">{{this.$t('cancel')}}</b-button>
    </b-form>

    <notifications position="bottom center"/>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Kitsu from 'kitsu';
const api = new Kitsu({
  //  baseURL: 'https://www1.urup.ru/api/',
  baseURL: 'http://laravel.test:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default {
  components: {
    PageHeader,
  },

  data () {
    return({
      pageHeaderText: 'OrganisationEdit',
      pageHeaderSub: '',
      organisation: {
        contacts: {},
        addresses: {},
        categories: {},
      },
      contactSelectOptions:[
        {value: "phone", text: "Телефон"},
        {value: "uri", text: "Сайт"},
        {value: "email", text: "E-Mail"}
      ],

    });
  },

  created () {
    if(this.$route.params.id != undefined){
      api.get('organisations/'+this.$route.params.id,{
        include: 'categories,addresses,contacts',
        fields: {organisations: 'id,name,shortName,description,slug'}
      })
      .then (response => {
        this.organisation = response.data;
        this.pageHeaderText = this.organisation.name;
      })
   
      // this.axios
      //   .get("organisations/" + this.$route.params.id)
      //   .then(response => {
      //     this.organisation = response.data.data;
      //     this.pageHeaderText = this.organisation.attributes.name;
      //   });
    };
  },

  methods: {
    onSubmit (evt){
      delete this.organisation.links;
      api.update('organisations',this.organisation)
      .then(response => {
        this.updateContacts()
      })
      .then( () => {
        this.$notify({type: 'success', text: 'ok'});
      })
      .catch( err =>{
        this.$notify({type: 'error', text: err});
      });
    },

    addContact (){
      this.organisation.contacts.push({
        id: -1,
        contact_type: 'phone',
        contact: '',
        description: ''
      })
    },

    removeContact (contact){
      if (contact){
        if(this.organisation.contacts.length > 1){
          this.organisation.contacts.splice(this.organisation.contacts.indexOf(contact),1);
        };
      }
    },

    updateContacts (){
      if(this.organisation.contacts.length){
        this.organisation.contacts.forEach(element => {
          delete element.links;
          if (element.id)
            api.update('contacts',element);
          else
            api.create('contacts',element)
            .then(response =>{
              console.dir(response);
            });
        });
      }
    },
  }

}
</script>
