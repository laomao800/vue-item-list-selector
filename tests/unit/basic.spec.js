import { mount } from '@vue/test-utils'
import ItemListSelector from '@/index.vue'

describe('Basic', () => {
  it('Data check', () => {
    const wrapper = mount(ItemListSelector)
    expect(wrapper.vm.keyword).toEqual('')
    expect(wrapper.vm.optionActiveIndex).toEqual(-1)
  })

  it('Reset data check', () => {
    const wrapper = mount(ItemListSelector)
    wrapper.setData({
      keyword: 'test'
    })
    wrapper.setProps({
      selection: ['test']
    })
    wrapper.vm.reset()
    const emitted = wrapper.emittedByOrder()
    expect(wrapper.vm.keyword).toEqual('')
    expect(emitted.length).toEqual(1)
    expect(emitted[0].name).toEqual('selection-change')
    expect(emitted[0].args[0]).toEqual([])
  })

  it('无数据空白组件', () => {
    const wrapper = mount(ItemListSelector)
    expect(wrapper.findAll('.item-selector__option').length).toEqual(0)
  })
})
