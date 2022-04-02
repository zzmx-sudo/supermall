<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll :probe-type="3" class="content" ref="detailscroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :top-infos="topInfos"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @goodsImageLoad="goodsImageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
  },
  data() {
    return {
      goodsId: null,
      topImages: [],
      topInfos: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
    };
  },
  created() {
    // 保存传入的商品id
    this.goodsId = this.$route.params.goodsId;

    /* 根据id请求详情页数据 */
    getDetail(this.goodsId).then((result) => {
      const data = result.result;

      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取顶部商品标题等数据
      this.topInfos = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取商品信息
      this.shopInfo = new Shop(data.shopInfo);

      // 4.获取详情页商品描述信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      this.commentInfo = data.rate.cRate !== 0 ? data.rate.list[0] : {};
    });
  },
  methods: {
    /* 事件监听相关方法 */
    goodsImageLoad() {
      this.$refs.detailscroll.refresh();
      console.log(this.$refs.detailscroll.scroll.maxScrollY);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0%;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>