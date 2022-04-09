<template>
  <div class="tar-bar-item" @click="itemClick">
    <div v-if="!isActivate">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active-icon"></slot>
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

<style scoped>
#tab-bar-item {
  flex: 1;
}

.item-icon img,
.item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>