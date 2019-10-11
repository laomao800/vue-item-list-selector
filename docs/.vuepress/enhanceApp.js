export default ({ Vue }) => {
  import('../../src')
    .then(module => {
      const ItemListSelector = module.default
      Vue.use(ItemListSelector)
    })
    .catch(e => {})

  import('@laomao800/vue-demo-box')
    .then(module => {
      const DemoBox = module.default
      Vue.use(DemoBox, {
        jsRes: [
          '//unpkg.com/vue@2.x/dist/vue.js',
          '//unpkg.com/@laomao800/vue-item-list-selector@2.x/dist/vue-item-list-selector.umd.min.js'
        ]
      })
    })
    .catch(e => {})
}
