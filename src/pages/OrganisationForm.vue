<template>
  <div class="container mb-5 pb-5">
    <PageHeader :headerText="pageHeaderText" :headerSub="pageHeaderSub"/>
    <b-form>
      <b-form-group
        id="input-group-organisation-name"
        :label="this.$t('organisation.form.name')"
        label-for="organisation-name"
      >
        <b-form-input
          id="organisation-name"
          v-model="organisation.attributes.name"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-short-name"
        :label="this.$t('organisation.form.shortName')"
        label-for="organisation-short-name"
      >
        <b-form-input
          id="organisation-short-name"
          v-model="organisation.attributes.shortName"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-description"
        :label="this.$t('organisation.form.description')"
        label-for="organisation-description"
      >
        <b-form-textarea
          id="organisation-description"
          v-model="organisation.attributes.descriprion"
        />
      </b-form-group>

      <b-form-group
        id="input-group-organisation-slug"
        :label="this.$t('organisation.form.slug')"
        label-for="organisation-slug"
      >
        <b-form-input
          id="organisation-slug"
          v-model="organisation.attributes.slug"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">{{this.$t('submit')}}</b-button>
      <b-button variant="secondary">{{this.$t('cancel')}}</b-button>
    </b-form>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";

export default {
  components: {
    PageHeader,
  },

  data () {
    return({
      pageHeaderText: 'OrganisationEdit',
      pageHeaderSub: '',
      organisation: {
        attributes: {}
      },
    });
  },

  created () {
    if(this.$route.params.id != undefined){
      this.axios
        .get("organisations/" + this.$route.params.id)
        .then(response => {
          this.organisation = response.data.data;
          this.pageHeaderText = this.organisation.attributes.name;
        });
    };
  }

}
</script>
