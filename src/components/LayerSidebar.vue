<template>
    <div class="layer-sidebar">
    <div class="search-container">
      <v-text-field label="Layer" v-model="layer"></v-text-field>
      <button @click="searchLayer" class="search-button">Search</button>
      <button v-if="columnNames.length > 0" @click="selectFields" class="search-button">Select({{ selectedFields.length }})</button>
    </div>
    <div class = "atributes" v-for="(name, index) in columnNames" :key="index">
      <input type="checkbox" :value="name" v-model="selectedFields" ref="layerSidebar">
      {{ name }}
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'LayerSidebar',
    data() {
        return {
            layer: '',
            layerAttributes: [],
            columnNames: [],
            selectedFields: [] 
        };
    },
    updated() {
    console.log('Layer:', this.layer);
    console.log('Layer Attributes:', this.layerAttributes);
    console.log('Column Names:', this.columnNames);
    console.log('Selected Fields:', this.selectedFields);
  },
    watch: {
    selectedFields(newVal) {
      console.log(newVal);
    },
  },
  created(){
    this.$bus.on('uncheck-property', this.uncheck);
  },
  beforeUnmount() {
  this.$bus.off('uncheck-property', this.uncheck);
},
    methods: {
        /*
        async created() {
            console
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/layers');
                console.log('API response:', response.data.data); // Log the response data

                if (Array.isArray(response.data.data)) {
                    this.layerNames = response.data.data.map(item => item.table_name) // Assign response.data.data to this.layerNames
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching layer names:', error); // Log any errors
            }
        },
        */
        uncheck(columnName) {
            const index = this.selectedFields.indexOf(columnName);
            if (index !== -1) {
                this.selectedFields.splice(index, 1);
                return; // Break the loop
            }
        },
        async searchLayer() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/layerAttributes/${this.layer}`, {
                    tableName: this.layer
                });
                console.log(response.data.data);
                if (Array.isArray(response.data.data)) {
                    this.columnNames = response.data.data.map(item => item.column_name);
                    this.layerAttributes = response.data.data.map(attributes => ({ 
                        column_name: attributes.column_name,
                        dataType: attributes.data_type, 
                        constraints : attributes.constraints,
                        referenced_table : attributes.referenced_table,
                    }));
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error(error); // displays in errors
            }
        }, 
        selectFields() {
            let filteredFields = this.selectedFields.filter(field => field !== 'NULL');
            console.log(filteredFields);

            // Find the corresponding attributes for each selected field
            let selectedAttributes = this.layerAttributes.filter(attribute => 
                filteredFields.includes(attribute.column_name)
            );

            // Emit the selected fields and their corresponding attributes
            this.$emit('update-attributes', { fields: filteredFields, attributes: selectedAttributes });
        },
    }
}
</script>

<style scoped>
.layer-sidebar {
        position: fixed;
        right: 0;
        top: 0;
        width: 300px; /* Adjust as needed */
        height: 80%;
        background-color: #e7e7e7; /* Adjust as needed */
        overflow-y: auto;
        padding-bottom: 20px;
}

.search-button {
  padding: 10px;
  background-color: #dadada;
}

.layer-sidebar div.atributes {
  text-align: left;
}
</style>