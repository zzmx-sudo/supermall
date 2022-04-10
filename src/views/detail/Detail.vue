<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :navbar-index="navBarIndex"
    ></detail-nav-bar>
    <scroll :probe-type="3" class="content" ref="scroll" @scroll="DetailScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :top-infos="topInfos"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @goodsImageLoad="goodsImageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommendInfos" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCartClick="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { itemListenerMixin } from "@/common/mixin";

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
    DetailBottomBar,

    Scroll,
    GoodsList,
    BackTop,
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
      recommendInfos: [],
      // 监听itemImageLoad事件后调用的函数
      imageLoadCal: null,
      themeTops: [],
      navBarIndex: 0,
      // 定义属性用于判断backTop是否显示
      isShowBackTop: false,
    };
  },
  mixins: [itemListenerMixin],
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

      // 上述各子组件获取到数据并且DOM渲染完成后才会调用该函数(图片不一定加载完成)
      // this.$nextTick(() => {
      //   // 获取各title位置的offsetTop
      //   this.themeTops[0] = 0;
      //   this.themeTops.push(this.$refs.param.$el.offsetTop);
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    /* 获取推荐商品数据 */
    getRecommend().then((result) => {
      this.recommendInfos = result.data.list;
    });
  },
  mounted() {},
  updated() {
    // this.themeTops = [];
    // // 获取各title位置的offsetTop
    // this.themeTops[0] = 0;
    // this.themeTops.push(this.$refs.param.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
  },
  methods: {
    /* 事件监听相关方法 */
    // 监听图片加载完成
    goodsImageLoad() {
      this.$refs.scroll.refresh();
      // console.log(this.$refs.scroll.scroll.maxScrollY);
      this.themeTops[0] = 0;
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTops);
    },

    // 监听顶部标题点击
    titleClick(index) {
      // console.log(index);
      this.navBarIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200);
    },

    // 滚动到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 监听scroll滚动方法
    DetailScroll(position) {
      const positionY = -position.y;
      if (positionY < this.themeTops[1]) {
        this.navBarIndex = 0;
      } else if (positionY < this.themeTops[2]) {
        this.navBarIndex = 1;
      } else if (positionY < this.themeTops[3]) {
        this.navBarIndex = 2;
      } else {
        this.navBarIndex = 3;
      }

      this.isShowBackTop = positionY > 1000;
    },

    // 加入购物车
    addToCart() {
      // console.log("添加商品到购物车,goodsId:" + this.goodsId);
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.topInfos.title;
      product.desc = this.topInfos.desc;
      product.price = this.topInfos.realPrice;
      product.goodsId = this.goodsId;

      // 2.将商品添加到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then((res) => {
        // console.log(res);
        this.$toast.show(res, 1500);
      });
    },
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.imageLoadCal);
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
  height: calc(100% - 102px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0%;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>