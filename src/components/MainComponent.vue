<template>
  <div class="mainComponent">
    <img alt="Vue logo" src="../assets/weezielogo.png">
    <LayerSidebar @update-attributes="updateAttributes" />
    <PropertiesSidebar @update-properties="updateProperties" />
    <div v-for="(item, index) in finalList" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
import PropertiesSidebar from './PropertiesSidebar.vue';
import LayerSidebar from './LayerSidebar.vue';

export default {
  name: 'MainComponent',
  components: {
    PropertiesSidebar,
    LayerSidebar
  },
  data() {
    return {
      attributes: [],
      properties: [],
    };
  },
  computed: {
    finalList() {
      const list = [...this.attributes, ...this.properties];
      console.log('Final list:', list);
      return list;
    },
  },
  methods: {
    updateAttributes(attributes) {
      this.attributes = attributes;
      console.log('Selected atributes:', this.attributes);
    },
    updateProperties(properties) {
      this.properties = properties.map(property => property.name);
      console.log('Selected properties:', this.properties);
    },
  },
};
</script>