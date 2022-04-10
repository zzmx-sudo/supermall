import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某个标签元素中
  toast.$mount(document.createElement("div"))

  // 4.此时toast已经有$el属性,将el加入到DOM中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj