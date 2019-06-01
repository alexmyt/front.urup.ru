<template>
  <div class="container mb-5">
    <b-breadcrumb :items="breadcrumbs"/>
    <pageHeader :headerText="organisation.attributes.name" :headerSub="categories[0].name"/>
    <article>
      <yandex-map
        :coords="[addresses[0].lat, addresses[0].lon]"
        :use-object-manager="true"
        :placemarks="placemarks"
        style="height:300px"
        zoom="17"
      >
        <ymap-marker
          marker-id="1"
          marker-type="placemark"
          :coords="[addresses[0].lat, addresses[0].lon]"
          :hitContent="organisation.attributes.name"
          :balloon="{header: organisation.attributes.name, body: addresses[0].address, footer: categories[0].name}"
          :icon="{color: 'darkGreen', glyph: 'DotIcon'}"
          cluster-name="1"
        ></ymap-marker>
      </yandex-map>
      <div class="row">
        <div class="col-12 col-sm-6">
          <dl class="row">
            <dt class="col-sm-3">Адрес</dt>
            <dd class="col-sm-9" itemprop="address">{{addresses[0].address}}</dd>

            <dt class="col-sm-3">Телефоны</dt>
            <dd class="col-sm-9 d-flex flex-column">
              <phoneNumber
                class="w-100"
                v-for="contact in phones"
                :key="contact.id"
                :contact="contact"
              />
            </dd>

            <template v-if="emails.length">
              <dt class="col-sm-3">E-Mail</dt>
              <dd v-for="contact in emails"  :key="contact.id" class="col-sm-9 d-flex flex-column">
                <span>
                  <a :href="'mailto:'+contact.contact" itemprop="email">{{contact.contact}}</a>
                </span>
              </dd>
            </template>

            <template v-if="urls.length">
              <dt class="col-sm-3">WWW</dt>
              <dd class="col-sm-9 d-flex flex-column">
                <p v-for="contact in urls" :key="contact.id">
                  <a :href="contact.contact" itemprop="url">{{contact.contact}}</a>
                </p>
              </dd>
            </template>
          </dl>
        </div>
      </div>
      <div class="organisationDescription" v-html="organisation.attributes.description"></div>
    </article>

    <fab
      position="down-right"
      bg-color="#0093DD"
      :actions="fabActions"
      start-opened=true
      fixed-tooltip=true
      @add="add"
      @edit="edit"
    ></fab>

  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import PhoneNumber from "components/PhoneNumber.vue";
import fab from 'vue-fab';

export default {
  components: {
    pageHeader: PageHeader,
    phoneNumber: PhoneNumber,
    fab
  },

  data () {
    return {
      organisation: {
        attributes: {name: '', description: ''}
      },
      categories: [
        {attributes: {name: ''}},
      ],
      addresses: [{ lon: 42.006310, lat: 50.798023 }],
      phones: [],
      emails: [],
      urls: [],
      breadcrumbs: [
        { text: "Главная", to: { name: "home" } },
        { text: "Организации", to: { name: "organisations" } }
      ],
      placemarks: [],

      fabActions: [],
    };
  },

  created () {
    this.axios
      .get("organisations/" + this.$route.params.id)
      .then(response => {
        this.organisation = response.data.data;
        this.breadcrumbs.push({ text: this.organisation.attributes.name, href: "#" });
        this.categories = [];
        this.addresses = [];

        response.data.included.forEach(resource => {
          switch (resource.type) {
            case 'contact':
              switch (resource.attributes.contact_type) {
                case "phone":
                  this.phones.push(resource.attributes);
                  break;
                case "email":
                  this.emails.push(resource.attributes);
                  break;
                case "uri":
                  this.urls.push(resource.attributes);
                  break;
              }
              break;
          
            case 'address':
              this.addresses.push(resource.attributes);
              break;
          
            case 'category':
              this.categories.push(resource.attributes);
              break;
          
            default:
              break;
          }
        });

        this.placemarks = [
          {
            coords: [this.addresses[0].lat, this.addresses[0].lon],
            properties: {},
            options: {}
          }
        ];

        // FAB innitialisation
        if (this.$auth.check('editor')){
          this.fabActions.push({name: 'edit', icon: 'edit', tooltip: this.$t('edit')});
        };
        this.fabActions.push({name: 'add', icon: 'add', tooltip: this.$t('add')});
      });
  },

  methods:{
    add() {

    },

    edit() {
      this.$router.push({name: 'editOrganisation', params:{id: this.$route.params.id}});
    },
  }
};
</script>
