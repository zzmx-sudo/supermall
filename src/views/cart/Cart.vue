<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <catr-list></catr-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CatrList from "./childComps/CatrList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CatrList,
    CartBottomBar,
  },
  computed: {
    // 通过解构直接拿取getters中的函数（方法）作为计算属性,名称和getters中的一致
    // 如果需要自定义名称,可在结构中传入对象,{[自定义名称]:"[getters中的名称]"}
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>