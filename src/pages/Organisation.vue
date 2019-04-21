<template>
  <div class="container mb-5">
    <b-breadcrumb :items="breadcrumbs"/>
    <pageHeader :headerText="organisation.name" :headerSub="category.name"/>
    <article>
      <yandex-map
        :coords="[address.lat, address.lon]"
        :use-object-manager="true"
        :placemarks="placemarks"
        style="height:300px"
      >
        <ymap-marker
          marker-id="1"
          marker-type="placemark"
          :coords="[address.lat, address.lon]"
          :hitContent="organisation.name"
          :balloon="{header: organisation.name, body: address.address, footer: category.name}"
          :icon="{color: 'darkGreen', glyph: 'DotIcon'}"
          cluster-name="1"
        ></ymap-marker>
      </yandex-map>
      <div class="row">
        <div class="col-12 col-sm-6">
          <dl class="row">
            <dt class="col-sm-3">Адрес</dt>
            <dd class="col-sm-9" itemprop="address">{{address.address}}</dd>

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
              <dd v-for="contact in emails" class="col-sm-9 d-flex flex-column">
                <span>
                  <a :href="'mailto:'+contact.contact" itemprop="email">{{contact.contact}}</a>
                </span>
              </dd>
            </template>

            <template v-if="urls.length">
              <dt class="col-sm-3">WWW</dt>
              <dd v-for="contact in urls" class="col-sm-9 d-flex flex-column">
                <span>
                  <a :href="contact.contact" itemprop="url">{{contact.contact}}</a>
                </span>
              </dd>
            </template>
          </dl>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import PageHeader from "components/PageHeader.vue";
import PhoneNumber from "components/PhoneNumber.vue";

export default {
  components: {
    pageHeader: PageHeader,
    phoneNumber: PhoneNumber
  },

  data() {
    return {
      organisation: [],
      category: {},
      address: { lat: 42.023224, lon: 50.794576 },
      phones: [],
      emails: [],
      urls: [],
      breadcrumbs: [
        { text: "Главная", to: { name: "home" } },
        { text: "Организации", to: { name: "organisations" } }
      ],
      placemarks: []
    };
  },

  created () {
    this.axios
      .get("organisations/" + this.$route.params.id)
      .then(response => {
        this.organisation = response.data.data;
        this.breadcrumbs.push({ text: response.data.name, href: "#" });
        this.category = response.data.data.categories[0];
        this.address = response.data.data.addresses[0];

        this.organisation.contacts.forEach(element => {
          switch (element.contact_type) {
            case "phone":
              this.phones.push(element);
              break;
            case "email":
              this.emails.push(element);
              break;
            case "uri":
              this.urls.push(element);
              break;
          }
        });

        this.placemarks = [
          {
            coords: [this.address.lat, this.address.lon],
            properties: {},
            options: {}
          }
        ];
      });
  }
};
</script>
