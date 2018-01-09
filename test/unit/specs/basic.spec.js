import Vue from 'vue'
import itemListSelector from '@/components/item-list-selector.vue'

function createViewModel (baseConfig) {
  const el = document.createElement('div')
  document.body.appendChild(el)

  return (config) => new Vue({
    el,
    ...baseConfig,
    ...config
  })
}

function getTestData () {
  return [
    { label: '小刘01', value: 30 },
    { label: '小张02', value: 20 },
    { label: '小刘03', value: 30 },
    { label: '小张04', value: 20 },
    { label: '小刘05', value: 30 },
    { label: '小张06', value: 20 },
    { label: '小刘07', value: 30 },
    { label: '小张08', value: 20 },
    { label: '小刘09', value: 30 },
    { label: '小张10', value: 20 },
    { label: '小刘11', value: 30 },
    { label: '小张12', value: 20 },
    { label: '小刘13', value: 30 },
    { label: '小张14', value: 20 },
    { label: '小刘15', value: 30 },
    { label: '小刘16', value: 30 },
    { label: '小刘17', value: 30 },
    { label: '小刘18', value: 30 },
    { label: '小刘19', value: 30 },
    { label: '小张20', value: 20 },
    { label: '小张21', value: 20 }
  ]
}

describe('Data render', () => {
  let vm
  const createVm = createViewModel({
    components: { itemListSelector },
    data: () => ({
      listData: getTestData(),
      selection: []
    })
  })
  afterEach(() => {
    vm.$destroy && vm.$destroy()
  })

  it('无数据空白组件', () => {
    vm = createVm({
      template: '<itemListSelector />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(0)
  })

  it('组件无分页', () => {
    vm = createVm({
      template: '<itemListSelector :data="listData" :use-page="false" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(vm.listData.length)
  })

  it('组件默认分页数量', () => {
    vm = createVm({
      template: '<itemListSelector :data="listData" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(10)
  })

  it('组件自定义分页数量', () => {
    for (let i = 1; i <= vm.listData.length; i++) {
      vm = createVm({
        template: `<itemListSelector :data="listData" :page-size="${i}" />`
      })
      expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(i)
    }
  })
})
