
import ItemListSelector from '@/components/item-list-selector.vue'
import { mount } from '@vue/test-utils'
import { getTestData } from './utils.js'

describe('Enter 切换当前选项选中状态', () => {
  const wrapper = mount({
    template: '<ItemListSelector ref="selector" :data="data" v-model="selection" />',
    components: { ItemListSelector },
    data: () => ({
      data: getTestData(),
      selection: []
    })
  })
  const $selector = wrapper.find({ ref: 'selector' })
  const $input = $selector.find('.item-selector__searchbar-inner input')
  const ACTIVE_INDEX = 2

  it('选中 ACTIVE_INDEX 选项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(1)
    expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX])
  })

  it('选择下一项', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX + 1
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(2)
    expect(wrapper.vm.selection[1]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
  })

  it('取消第一次选择的数据', () => {
    $selector.setData({
      optionActiveIndex: ACTIVE_INDEX
    })
    $input.trigger('keyup.enter')
    const selection = wrapper.vm.selection
    expect(selection.length).toEqual(1)
    expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
  })
})
