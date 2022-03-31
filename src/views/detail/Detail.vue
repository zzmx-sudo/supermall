<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

import { getDetail } from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      goodsId: null,
      topImages: null,
    };
  },
  created() {
    // 保存传入的商品id
    this.goodsId = this.$route.params.goodsId;
    // 根据id请求详情页数据
    getDetail(this.goodsId).then((result) => {
      this.topImages = result.result.itemInfo.topImages;
    });
  },
};
</script>

<style>
</style>