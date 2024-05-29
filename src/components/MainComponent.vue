<template>
  <div class="mainComponent">
    <img alt="Vue logo" src="../assets/weezielogo.png">
    <LayerSidebar @update-attributes="updateAttributes" />
    <PropertiesSidebar @update-properties="updateFilteredProperties" />
    <v-row>
      <v-col v-for="(item, index) in finalList" :key="index" cols="8" md="3"> <!--md é que mexe com o tamanho das caixas -->
        <v-card>
          <v-card-title>{{ item.column_name }}</v-card-title>
          <v-card-text>
            Data Type: {{ item.dataType }}<br>
            Constraints: {{ item.constraints }}<br>
            Referenced Table: {{ item.referenced_table }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      filteredProperties: [], 
    };
  },
  computed: {
    finalList() {
      const list = [...this.attributes, ...this.filteredProperties.map(property => ({title: property.name, value: property.value}))];
      console.log('Final list:', list);
      return list;
    },
  },
  methods: {
    updateAttributes({ fields, attributes }) {
      this.attributes = attributes.map((attribute, index) => ({
        column_name: fields[index],
        ...attribute
      }));
      console.log('Selected attributes:', this.attributes);
    },
    updateFilteredProperties(properties) { 
      this.filteredProperties = properties; 
      console.log('Selected properties:', this.filteredProperties); 
    },
  },
};
</script>