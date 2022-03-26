<template>
  <div id="app">
    <router-view />
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from "components/content/mainTarBar/MainTarBar";

export default {
  name: "App",
  components: {
    MainTarBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
