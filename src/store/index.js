import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // payload存在情况，对其数量+1
    addCounter(state, payload) {
      payload.count++
    },
    // payload不存在情况，push到cartList中
    pushPayload(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // filter判断payload是否在carList中
        let oldPayload = context.state.cartList.filter(goods => {
          return (goods.goodsId === payload.goodsId)
        })

        // oldPayload长度不等于0,表示payload曾被添加过
        if (Object.keys(oldPayload).length != 0) {
          // oldPayload[0].count += 1
          // 对state的真实操作通过调用mutations实现
          context.commit("addCounter", oldPayload[0])
          resolve("当前的商品数量+1")
        } else {
          payload.count = 1
          payload.isChecked = true
          // state.cartList.push(payload)
          // 对state的真实操作通过调用mutations实现
          context.commit("pushPayload", payload)
          resolve("添加了新的商品")
        }
      })
    }
  },
  modules: {
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }
})
