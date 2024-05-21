<template>
  <div class="layer-sidebar">
    <div class="search-container">
      <v-text-field label="Layer" v-model="layer"></v-text-field>
      <button @click="searchLayer" class="search-button">Search</button>
      <button v-if="columnNames.length > 0" @click="selectFields" class="search-button">Select({{ selectedFields.length }})</button>
    </div>
    <div class = "atributes" v-for="(name, index) in columnNames" :key="index">
      <input type="checkbox" :value="name" v-model="selectedFields">
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
            columnNames: [],
            selectedFields: [] 
        };
    },
    watch: {
    selectedFields(newVal) {
      console.log(newVal);
    },
  },
    methods: {
        async searchLayer() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/annotation_points/${this.layer}`, {
                    tableName: this.layer
                });
                console.log(response.data.data);
                if (Array.isArray(response.data.data)) {
                    this.columnNames = response.data.data.map(item => item.column_name);
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
            this.$emit('update-attributes', filteredFields);
        }
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