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
          <span v-for="property in filteredPropertiesList" :key="property.name">
            {{ property.name }}: {{ property.value }}<br>
          </span>
          </v-card-text>
          <v-card-actions>
            <v-btn class= "remove-button" @click="uncheckProperty(item.column_name)">
              <i class="fas fa-times remove-icon"></i>
            </v-btn>
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
      filteredProperties: {},
      properties: [], 
    };
  },
  computed: {
    filteredPropertiesList() {
      return this.properties.filter(property => this.filteredProperties[property.name]);
    },
    finalList() {
      return this.attributes.map((attribute, index) => {
        let attributeWithProperties = {...attribute};
        const property = this.properties.find(prop => prop.name === 'Index' && prop.value === index);
        if (property) {
          attributeWithProperties = {...attributeWithProperties, ...property};
        }
        console.log('Attribute with properties:', attributeWithProperties);
        return attributeWithProperties;
      });
    }
  },
  created(){
  this.$bus.on('update-properties', this.updateProperties);
  this.$bus.on('uncheck-property', this.uncheckProperty);
},
  methods: {
    updateProperties(properties) {
      const index = this.filteredProperties['Index'];
      if (index !== undefined && this.attributes[index]) {
        this.attributes[index] = properties;
      }
      console.log('Updated properties:', this.attributes);
    },
    updateAttributes({ fields, attributes }) {
      this.attributes = attributes.map((attribute, index) => ({
        column_name: fields[index],
        ...attribute,
        Index: index
      }));
      console.log('Selected attributes:', this.attributes);
    },
    updateFilteredProperties(properties) { 
      this.filteredProperties = properties.reduce((acc, property) => {
        acc[property.name] = property.value;
        return acc;
      }, {});
      this.properties = properties; 
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
.remove-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>