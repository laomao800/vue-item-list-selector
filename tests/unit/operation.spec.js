import { mount } from '@vue/test-utils'
import ItemListSelector from '@/'
import getOptions from './__getOptions'

describe('Operation', () => {
  const wrapper = mount(ItemListSelector, {
    propsData: {
      optionsData: getOptions(),
      value: []
    }
  })
  const $input = wrapper.find('.item-selector__searchbar input')

  it('Press ↓', async () => {
    wrapper.setData({
      activeIndex: 2
    })
    expect(wrapper.findAll('.item-selector__option--active').length).toEqual(1)
    $input.trigger('keydown.down')
    expect(wrapper.vm.activeIndex).toEqual(3)
    $input.trigger('keydown.down')
    expect(wrapper.vm.activeIndex).toEqual(4)
  })

  it('Press ↓ at last', () => {
    wrapper.setData({
      activeIndex: wrapper.vm.filtedData.length - 1
    })
    $input.trigger('keydown.down')
    expect(wrapper.vm.activeIndex).toEqual(0)
  })

  it('Press ↑', () => {
    wrapper.setData({
      activeIndex: 2
    })
    $input.trigger('keydown.up')
    expect(wrapper.vm.activeIndex).toEqual(1)
    $input.trigger('keydown.up')
    expect(wrapper.vm.activeIndex).toEqual(0)
  })

  it('Press ↑ at first', () => {
    wrapper.setData({
      activeIndex: 0
    })
    $input.trigger('keydown.up')
    expect(wrapper.vm.activeIndex).toEqual(wrapper.vm.filtedData.length - 1)
  })
})
