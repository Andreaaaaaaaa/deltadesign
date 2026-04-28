<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <Button label="Button"></Button>
</template>

<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
// import Button from './stories/Button.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Button,
  },
};
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
</style>
