import itemListSelector from '@/components/item-list-selector.vue'
import { getTestData, createViewModel } from './utils.js'

let vm
const createVm = createViewModel({
  components: { itemListSelector },
  data: () => ({
    listData: getTestData(),
    selection: []
  })
})

describe('基础', () => {
  // afterEach(() => {
  //   vm.$destroy && vm.$destroy()
  // })

  it('Data check', () => {
    vm = createVm({
      template: '<itemListSelector ref="selector" />'
    })
    expect(vm.$refs.selector.keyword).to.equal('')
    expect(vm.$refs.selector.curPage).to.equal(1)
    expect(vm.$refs.selector.optionActiveIndex).to.equal(-1)
  })

  it('无数据空白组件', () => {
    vm = createVm({
      template: '<itemListSelector ref="selector" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(0)
  })

  it('组件无分页', () => {
    vm = createVm({
      template: '<itemListSelector ref="selector" :data="listData" :use-page="false" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(vm.listData.length)
    expect(vm.$refs.selector.showingData.length).to.equal(vm.listData.length)
  })

  it('组件默认分页数量', () => {
    vm = createVm({
      template: '<itemListSelector  ref="selector":data="listData" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(10)
  })

  it('组件自定义分页数量', () => {
    for (let i = 1; i <= vm.listData.length; i++) {
      vm = createVm({
        template: `<itemListSelector ref="selector" :data="listData" :page-size="${i}" />`
      })
      expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(i)
    }
  })

  it('optionTemplate - 默认', () => {
    vm = createVm({
      template: `<itemListSelector ref="selector" :data="listData" />`
    })
    Array.from(vm.$el.querySelectorAll('.item-selector__option')).forEach((row, index) => {
      expect(row.innerHTML).to.equal(vm.listData[index].label)
    })
  })

  it('optionTemplate - 自定义格式', () => {
    vm = createVm({
      template: `<itemListSelector ref="selector" :data="listData" :option-template="optionTemplate" />`,
      methods: {
        optionTemplate (option) {
          return `${option.label}---${option.value}`
        }
      }
    })
    Array.from(vm.$el.querySelectorAll('.item-selector__option')).forEach((row, index) => {
      expect(row.innerHTML).to.equal(`${vm.listData[index].label}---${vm.listData[index].value}`)
    })
  })
})

describe('选项过滤', () => {
  // afterEach(() => {
  //   vm.$destroy && vm.$destroy()
  // })

  it('关键字过滤', () => {
    vm = createVm({
      template: '<itemListSelector ref="selector" />'
    })
    expect(vm.$el.querySelectorAll('.item-selector__option').length).to.equal(0)
  })
})
