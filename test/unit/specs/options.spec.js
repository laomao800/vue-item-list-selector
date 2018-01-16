import ItemListSelector from '@/components/item-list-selector.vue'
import { mount } from '@vue/test-utils'
import { getTestData } from './utils.js'

describe('Options', () => {
  it('optionTemplate - 默认', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    Array.from(wrapper.vm.$el.querySelectorAll('.item-selector__option')).forEach((row, index) => {
      expect(row.innerHTML).toEqual(wrapper.vm.data[index].label)
    })
  })

  it('optionTemplate - 自定义格式', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData(),
        optionTemplate (option) {
          return `${option.label}---${option.value}`
        }
      }
    })
    Array.from(wrapper.vm.$el.querySelectorAll('.item-selector__option')).forEach((row, index) => {
      expect(row.innerHTML).toEqual(`${wrapper.vm.data[index].label}---${wrapper.vm.data[index].value}`)
    })
  })

  it('翻页', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    const $prev = wrapper.find('.pagelink-prev')
    const $next = wrapper.find('.pagelink-next')
    expect($prev.classes()).toContain('pagelink-disabled')
    expect($next.classes()).not.toContain('pagelink-disabled')

    // 翻到最后一一页
    for (let i = 1; i < wrapper.vm.totalPage; i++) {
      $next.trigger('click')
    }
    expect($prev.classes()).not.toContain('pagelink-disabled')
    expect($next.classes()).toContain('pagelink-disabled')

    // 翻到第一页
    for (let i = 1; i < wrapper.vm.totalPage; i++) {
      $prev.trigger('click')
    }
    expect($prev.classes()).toContain('pagelink-disabled')
    expect($next.classes()).not.toContain('pagelink-disabled')
  })

  it('关键字过滤', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    wrapper.setData({
      keyword: '小张'
    })
    expect(wrapper.findAll('.item-selector__option').length).toEqual(9)
  })
})
