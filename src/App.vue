<template>
  <div id="app">
    <LayerSidebar/>
    <img alt="Vue logo" src="./assets/weezielogo.png">
    <MainComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import LayerSidebar from './components/LayerSidebar.vue'

export default {
  name: 'App',
  components: {
    MainComponent,
    LayerSidebar
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
  height: 200px;
}
</style>
