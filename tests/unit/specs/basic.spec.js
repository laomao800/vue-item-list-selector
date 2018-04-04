import ItemListSelector from '@/components/item-list-selector.vue'
import { mount } from '@vue/test-utils'
import { getTestData } from './utils.js'

describe('Basic', () => {
  it('Data check', () => {
    const wrapper = mount(ItemListSelector)
    expect(wrapper.vm.keyword).toEqual('')
    expect(wrapper.vm.curPage).toEqual(1)
    expect(wrapper.vm.optionActiveIndex).toEqual(-1)
  })

  it('Reset data check', () => {
    const wrapper = mount(ItemListSelector)
    wrapper.setData({
      curPage: 2,
      keyword: 'test'
    })
    wrapper.setProps({
      selection: ['test']
    })
    wrapper.vm.reset()
    const emitted = wrapper.emittedByOrder()
    expect(wrapper.vm.keyword).toEqual('')
    expect(wrapper.vm.curPage).toEqual(1)
    expect(emitted.length).toEqual(1)
    expect(emitted[0].name).toEqual('selection-change')
    expect(emitted[0].args[0]).toEqual([])
  })

  it('无数据空白组件', () => {
    const wrapper = mount(ItemListSelector)
    expect(wrapper.findAll('.item-selector__option').length).toEqual(0)
  })

  it('组件无分页', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData(),
        usePage: false
      }
    })
    expect(wrapper.findAll('.item-selector__option').length).toEqual(wrapper.vm.data.length)
    expect(wrapper.vm.showingData.length).toEqual(wrapper.vm.data.length)
    expect(wrapper.vm.totalPage).toEqual(1)
  })

  it('组件默认分页数量', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    expect(wrapper.findAll('.item-selector__option').length).toEqual(10)
    expect(wrapper.vm.totalPage).toEqual(3)
  })

  it('组件自定义分页数量', () => {
    const PAGE_SIZE = 5
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData(),
        pageSize: PAGE_SIZE
      }
    })
    expect(wrapper.findAll('.item-selector__option').length).toEqual(PAGE_SIZE)
    expect(wrapper.vm.totalPage).toEqual(5)
  })
})
