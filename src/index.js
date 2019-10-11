import Component from './ItemListSelector.vue'

Component.install = function(Vue) {
  Vue.component(Component.name, Component)
}

if (typeof window !== 'undefined' && window.Vue) {
  Component.install(window.Vue)
}

export default Component
