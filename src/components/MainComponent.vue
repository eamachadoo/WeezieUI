<template>
  <div class="mainComponent">
    <img alt="Vue logo" src="../assets/weezielogo.png">
    <LayerSidebar @update-attributes="updateAttributes" />
    <PropertiesSidebar @update-properties="updateFilteredProperties" />
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
      filteredProperties: [], // Add this line
    };
  },
  computed: {
    finalList() {
      const list = [...this.attributes, ...this.filteredProperties.map(property => `${property.name}: ${property.value}`)];
      console.log('Final list:', list);
      return list;
    },
  },
  methods: {
    updateAttributes(attributes) {
      this.attributes = attributes;
      console.log('Selected atributes:', this.attributes);
    },
    updateFilteredProperties(properties) { // Change this method name
      this.filteredProperties = properties; // Change this line
      console.log('Selected properties:', this.filteredProperties); // Change this line
    },
  },
};
</script>