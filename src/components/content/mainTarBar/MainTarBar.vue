<template>
  <tar-bar>
    <tar-bar-item path="/home" activateColor="red">
      <img src="~assets/img/tarbar/shouye.png" slot="item-icon" />
      <img
        src="~assets/img/tarbar/shouyeactive.png"
        slot="item-icon-activate"
      />
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item path="/category" activateColor="red">
      <img src="~assets/img/tarbar/fenlei.png" slot="item-icon" />
      <img
        src="~assets/img/tarbar/fenleiactive.png"
        slot="item-icon-activate"
      />
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item path="/cart" activateColor="red">
      <img src="~assets/img/tarbar/gouwuche.png" slot="item-icon" />
      <img
        src="~assets/img/tarbar/gouwucheactive.png"
        slot="item-icon-activate"
      />
      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item path="/profile" activateColor="red">
      <img src="~assets/img/tarbar/wode.png" slot="item-icon" />
      <img src="~assets/img/tarbar/wodeactive.png" slot="item-icon-activate" />
      <div slot="item-text">首页</div>
    </tar-bar-item>
  </tar-bar>
</template>

<script>
import TarBar from "../../common/tarbar/TarBar.vue";
import TarBarItem from "../../common/tarbar/TarBarItem.vue";
export default {
  name: "MainTarBar",
  components: { TarBar, TarBarItem },
};
</script>

<style>
</style>