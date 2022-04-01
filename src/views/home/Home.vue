<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- tabControl副本 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tarClick="tabClick"
      class="tab-control"
      v-show="isTabCopyShow"
      ref="tabControl1"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="contentPullingUp"
    >
      <home-swiper
        :banners="banners"
        @SwiperimageLoad.once="SwiperimageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-views></feature-views>
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tarClick="tabClick"
      ></tab-control>
      <goodslist :goods="typeGoods"></goodslist>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Goodslist from "components/content/goods/Goodslist";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureViews from "./childComps/FeatureViews";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "@/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    Goodslist,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    FeatureViews,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      // 定义属性用于判断tabControl副本是否显示
      isTabCopyShow: false,
      // 定义属性用于保存home路由滚动的y轴位置
      saveY: 0,
    };
  },
  computed: {
    typeGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    // time传入0,瞬间滚动到指定位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 记得刷新一次滚动
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // this.saveY = this.$refs.scroll.scroll.y;
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 1.请求多个数据
    this.getMultidata();

    // 2.请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    // 1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 300);

    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /* 事件监听相关方法 */
    SwiperimageLoad() {
      // 组件的$el属性可以拿到组件对应的template
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 防抖函数
    // debounce(func, delay) {
    //   let time = null;
    //   return function (...args) {
    //     // 如果time存在（表示上次setTimeout函数未到执行时间）则清除计时器
    //     if (time) clearTimeout(time);
    //     time = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          this.currentType = "pop";
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    contentScroll(position) {
      // 1.监听BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.监听tabControl副本是否显示
      this.isTabCopyShow = -position.y > this.tabOffsetTop;
    },

    contentPullingUp() {
      this.getGoods(this.currentType);
      // 500毫秒后才能继续使用上拉加载更多
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 500);
    },

    /* 网络请求相关方法 */
    getMultidata() {
      getHomeMultidata().then((res) => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },

    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed; */
  /* left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  height: calc(100% - 93px);
  /* margin-top: 44px; */

  overflow: hidden;
  position: absolute;
  top: 44px;
  /* bottom: 49px; */
  /* left: 0; */
  /* right: 0; */
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>