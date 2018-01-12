import ItemListSelector from '@/components/item-list-selector.vue'
import { mount } from 'vue-test-utils'
import { getTestData } from './utils.js'

describe('', () => {
  it('setSelection', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    const filterFunc = r => r.value.toString()[0] === '0'
    wrapper.vm.setSelection(filterFunc)
    expect(wrapper.emittedByOrder().length).toEqual(1)
    expect(wrapper.emittedByOrder()[0].name).toEqual('selection-change')
    expect(wrapper.emittedByOrder()[0].args[0].every(filterFunc)).toBeTruthy()
  })

  it('addSelection', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    wrapper.vm.addSelection(r => r.value.toString() === '10')
    wrapper.vm.addSelection(r => r.value.toString() === '20')
    expect(wrapper.emitted()['selection-change'].length).toEqual(2)
    expect(wrapper.emitted()['selection-change'][0][0][0].value.toString()).toEqual('10')
    expect(wrapper.emitted()['selection-change'][1][0][0].value.toString()).toEqual('20')
  })

  it('removeSelection', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    wrapper.vm.addSelection(r => r.value.toString() === '10')
    wrapper.setProps({
      selection: wrapper.emitted()['selection-change'][0][0]
    })
    wrapper.vm.removeSelection(r => r.value.toString() === '10')
    expect(wrapper.emitted()['selection-change'].length).toEqual(2)
    expect(wrapper.emitted()['selection-change'][0][0][0].value.toString()).toEqual('10')
    expect(wrapper.emitted()['selection-change'][1][0]).toEqual([])
  })
})
