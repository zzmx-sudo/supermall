<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-bottom"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="calculate" :class="{ notClick: notClickFlag }">
      去计算 {{ checkLength }}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.isChecked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.isChecked = true;
        });
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥ " +
        this.cartList
          .filter((item) => {
            return item.isChecked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.isChecked;
      }).length;
    },
    notClickFlag() {
      return this.checkLength === 0;
    },
    isSelectAll() {
      // return (
      //   this.cartList.length !== 0 &&
      //   this.checkLength === this.cartList.length
      // );
      return (
        this.cartList.length !== 0 &&
        !this.cartList.find((item) => !item.isChecked)
      );
    },
  },
  components: { CheckButton },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;

  background-color: #eeee;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 60px; */
}

.check-bottom {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  /* flex: 1; */
}

.calculate {
  width: 90px;
  position: absolute;
  right: 0;
  background-color: red;
  color: #fff;
  text-align: center;
}

.notClick {
  background-color: rgb(105, 98, 98);
  color: black;
}
</style>