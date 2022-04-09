<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tar-bar class="fix"></main-tar-bar>
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

#app {
  position: relative;
}
.fix {
  position: fixed;
}
</style>
