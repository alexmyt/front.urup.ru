<template>
  <div class="container pb-5">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <pageHeader headerText='Справочник организаций'></pageHeader>

    <b-card-group deck>
      <organisationCategoryCard category="59" header="Органы власти" />
      <organisationCategoryCard category="57" header="Структуры ЖКХ" />
      <organisationCategoryCard category="69" header="Здравоохранение" />
    </b-card-group>

    <b-card-group deck>
      <organisationCategoryCard category="76" header="Еда и отдых" />
      <organisationCategoryCard category="56" header="Гостиницы, отели" />
      <organisationCategoryCard category="77" header="Туристические базы" />
    </b-card-group>

  </div>
</template>

<script>
import PageHeader from 'components/PageHeader.vue';
import OrganisationsCategoryCard from 'components/OrganisationsCategoryCard.vue';

export default {
  components:{
    'pageHeader': PageHeader,
    'organisationCategoryCard' : OrganisationsCategoryCard,
  },
  
  data () {
    return {
      breadcrumbs: [
        { text: 'Главная', to: {name: 'home' }},
        { text: 'Организации', to: {name: 'organisations'}},
      ],
    }
  },

}
</script>
