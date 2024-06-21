<template>
  <div class="mainComponent">
    <img alt="Vue logo" src="../assets/weezielogo.png">
    <LayerSidebar ref="layerSidebar" @update-attributes="updateAttributes" @uncheck-property="uncheckProperty" />
    <PropertiesSidebar @update-properties="updateFilteredProperties" />
    <v-row>
      <v-col v-for="(item, index) in finalList" :key="index" cols="8" md="3">
        <v-card>
          <v-card-title>{{ item.column_name }}</v-card-title>
          <v-card-text>
            Data Type: {{ item.dataType }}<br>
            Constraints: {{ item.constraints }}<br>
            Referenced Table: {{ item.referenced_table }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="uncheckProperty(item.column_name)">Uncheck</v-btn>
          </v-card-actions>
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
  created(){
  this.$bus.on('uncheck-property', this.uncheckProperty);
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
    uncheckProperty(columnName) {
      const index = this.attributes.findIndex(attribute => attribute.column_name === columnName);
      if (index !== -1) {
        this.attributes.splice(index, 1);
        // Emit an event to uncheck the checkbox in LayerSidebar
        this.$bus.emit('uncheck-property', columnName);
        return; // Break the loop
      }
    },
  },
};
</script>
<style scoped>
.mainComponent {
  padding-top: 80px;
  padding-right: 300px; /* Adjust as needed */
}
</style>