import { debounce } from "@/common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 300);

    this.imageLoadCal = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.imageLoadCal);
  },
}

export const backTopMixin = {
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShow = (-position.y) > 1000
    }
  },
  components: {
    BackTop
  }
}