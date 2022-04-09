import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      // filter判断payload是否在carList中
      let oldPayload = state.cartList.filter(goods => {
        return (goods.goodsId === payload.goodsId)
      })

      // oldPayload长度不等于0,表示payload曾被添加过
      if (Object.keys(oldPayload).length != 0) {
        oldPayload[0].count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
