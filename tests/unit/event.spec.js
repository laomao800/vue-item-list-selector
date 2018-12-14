import { mount } from '@vue/test-utils'
import ItemListSelector from '@/index.vue'
import getTestData from './getTestData.js'

describe('Events', () => {
  const wrapper = mount(ItemListSelector, {
    propsData: {
      data: getTestData(),
      selection: []
    }
  })
  const $input = wrapper.find('.item-selector__searchbar input')

  it('鼠标点击选项', () => {
    wrapper
      .findAll('.item-selector__option')
      .at(0)
      .element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][0][0] })
    wrapper
      .findAll('.item-selector__option')
      .at(1)
      .element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][1][0] })
    wrapper
      .findAll('.item-selector__option')
      .at(1)
      .element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][2][0] })
    expect(wrapper.vm.selection.length).toEqual(1)
    expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[0])
    expect(wrapper.emittedByOrder().map(r => r.name)).toEqual([
      'selection-change',
      'selection-change',
      'selection-change'
    ])
  })

  it('下箭头移动高亮选项', () => {
    wrapper.setData({
      optionActiveIndex: 2
    })
    expect(wrapper.findAll('.item-selector__option--active').length).toEqual(1)
    $input.trigger('keyup.down')
    expect(wrapper.vm.optionActiveIndex).toEqual(3)
    $input.trigger('keyup.down')
    expect(wrapper.vm.optionActiveIndex).toEqual(4)
  })

  it('在底部选项边缘，下箭头移动高亮选项到第一项', () => {
    wrapper.setData({
      optionActiveIndex: wrapper.vm.filtedData.length - 1
    })
    $input.trigger('keyup.down')
    expect(wrapper.vm.optionActiveIndex).toEqual(0)
  })

  it('上箭头移动高亮选项', () => {
    wrapper.setData({
      optionActiveIndex: 2
    })
    $input.trigger('keyup.up')
    expect(wrapper.vm.optionActiveIndex).toEqual(1)
    $input.trigger('keyup.up')
    expect(wrapper.vm.optionActiveIndex).toEqual(0)
  })

  it('在底部选项边缘，上箭头移动高亮选项到第一项', () => {
    wrapper.setData({
      optionActiveIndex: 0
    })
    $input.trigger('keyup.up')
    expect(wrapper.vm.optionActiveIndex).toEqual(
      wrapper.vm.filtedData.length - 1
    )
  })
})
