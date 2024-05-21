<template>
    <div class="properties-sidebar">
        <h3>Properties</h3>
        <div v-for="(property, index) in properties" :key="index">
            <label>{{ property.name }}</label>
            <input v-if="property.type === 'integer'" type="number" :value="property.value" @input="updateProperties([{ name: property.name, value: $event.target.value }])">
            <select v-else-if="property.type === 'size'" :value="property.value" @change="updateProperties([{ name: property.name, value: $event.target.value }])">
                <option>S</option>
                <option>M</option>
                <option>L</option>
            </select>
            <input v-else-if="property.type === 'boolean'" type="checkbox" :checked="property.value" @change="updateProperties([{ name: property.name, value: $event.target.checked }])">
        </div>
        <button @click="applyProperties" class="apply-button">Apply</button>
    </div>
</template>

<script>
export default {
    name: 'PropertiesSidebar',
    data() {
        return {
            properties: [
                { name: 'Index', type: 'integer', value: 0 },
                { name: 'Size', type: 'size', value: 'NULL' },
                { name: 'Required', type: 'boolean', value: false }
            ]
        };
    },
    methods: {
        updateProperties(updatedProperties) {
            updatedProperties.forEach(updatedProperty => {
                const property = this.properties.find(prop => prop.name === updatedProperty.name);
                if (property) {
                    property.value = updatedProperty.value;
                } else {
                    this.properties.push(updatedProperty);
                }
            });
            console.log('Selected properties:', this.properties);
        },
        applyProperties() {
            let filteredProperties = this.properties.filter(property => property.value);
            console.log('Applied properties:', filteredProperties); //log
            this.$emit('update-properties', filteredProperties);
        }
    }
}
</script>

<style scoped>
.properties-sidebar {
    position: fixed;
    right: 0;
    top: 80%;
    width: 300px; /* Adjust as needed */
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