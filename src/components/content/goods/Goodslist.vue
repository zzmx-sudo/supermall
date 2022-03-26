<template>
  <div class="goods">
    <goodslist-item v-for="(item, index) in goods" :goods-item="item" />
  </div>
</template>

<script>
import GoodslistItem from "./GoodslistItem";

export default {
  name: "Goodslist",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodslistItem,
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>