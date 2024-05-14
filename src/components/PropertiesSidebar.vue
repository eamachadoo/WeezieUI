<template>
    <div class="properties-sidebar">
        <h3>Properties</h3>
        <div v-for="(property, index) in properties" :key="index">
            <input type="checkbox" :value="property" v-model="selectedProperties">
            {{ property }}
        </div>
        <button @click="applyProperties" class="apply-button">Apply</button>
    </div>
</template>

<script>
export default {
    name: 'PropertiesSidebar',
    data() {
        return {
            properties: ['Index', 'Size', 'Required'],
            selectedProperties: []
        };
    },
    methods: {
        applyProperties() {
            // Handle the apply properties action here
        }
    }
}
</script>

<style scoped>
.properties-sidebar {
    position: fixed;
    right: 0;
    top: 80%;
    width: 250px; /* Adjust as needed */
    height: calc(100% - 250px); /* Adjust as needed */
    background-color: #e7e7e7; /* Adjust as needed */
    overflow-y: auto;
    padding-bottom: 70px;
}
.apply-button {
    padding: 10px;
    background-color: #dadada;
}
</style>