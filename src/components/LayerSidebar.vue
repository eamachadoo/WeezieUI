<template>
        <div class="layer-sidebar">
    <div class="search-container">
      <v-text-field label="Layer" v-model="layer"></v-text-field>
      <button @click="searchLayer" class="search-button">Search</button>
    </div>
    <div v-for="(name, index) in columnNames" :key="index">
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
            columnNames: [] 
        };
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
        }
    }
}
</script>
<style scoped>
.layer-sidebar {
        position: fixed;
        right: 0;
        width: 200px; /* Adjust as needed */
        height: 100%;
        background-color: #e7e7e7; /* Adjust as needed */
}

.search-button {
  padding: 10px;
  background-color: #dadada;
}
</style>