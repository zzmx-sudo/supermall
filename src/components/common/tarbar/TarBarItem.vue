<template>
  <div class="tar-bar-item" @click="itemClick">
    <div v-if="!isActivate">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-activate"></slot>
    </div>
    <div :style="activateStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TarBarItem",
  props: {
    path: String,
    activateColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActivate() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activateStyle() {
      return this.isActivate ? { color: this.activateColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tar-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tar-bar-item img {
  width: 22px;
  height: 22px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>