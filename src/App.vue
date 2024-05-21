<template>
  <div id="app">
    <LayerSidebar/>
    <PropertiesSidebar/>
    <MainComponent/>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import LayerSidebar from './components/LayerSidebar.vue'
import PropertiesSidebar from './components/PropertiesSidebar.vue'

export default {
  name: 'App',
  components: {
    MainComponent,
    LayerSidebar,
    PropertiesSidebar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app img {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 180px;
}
</style>
