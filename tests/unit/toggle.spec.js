import { mount } from '@vue/test-utils'
import ItemListSelector from '@/index.vue'
import getTestData from './getTestData.js'

describe('Enter 切换当前选项选中状态', () => {
  const wrapper = mount({
    template:
      '<ItemListSelector ref="selector" :data="data" v-model="selection" />',
    components: { ItemListSelector },
    data: () => ({
      data: getTestData(),
      selection: []
    })
  })
  const $selector = wrapper.find({ ref: 'selector' })
  const $input = $selector.find('.item-selector__searchbar input')
  const ACTIVE_INDEX = 2

  it('选中 ACTIVE_INDEX 选项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(1)
    expect(selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX])
  })

  it('选择下一项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX + 1
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(2)
    expect(selection[1]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
  })

  it('取消第一次选择的数据', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(1)
    expect(selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
  })
})

describe('单选模式', () => {
  const wrapper = mount({
    template:
      '<ItemListSelector ref="selector" :data="data" :multiple="false" v-model="selection" />',
    components: { ItemListSelector },
    data: () => ({
      data: getTestData(),
      selection: {}
    })
  })
  const $selector = wrapper.find({ ref: 'selector' })
  const $input = $selector.find('.item-selector__searchbar input')
  const ACTIVE_INDEX = 2

  it('选中 ACTIVE_INDEX 选项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX
    })
    $input.trigger('keyup.enter')
    expect(wrapper.vm.selection).toEqual(wrapper.vm.data[ACTIVE_INDEX])
  })

  it('选择下一项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX + 1
    })
    $input.trigger('keyup.enter')
    expect(wrapper.vm.selection).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
  })
})
