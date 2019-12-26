import { mount } from '@vue/test-utils'
import ItemListSelector from '@/'
import getOptions from './__getOptions'

describe('Methods', () => {
  it('setValue', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: getOptions()
      }
    })
    const filterFunc = r => r.value === '01'
    wrapper.vm.setValue(filterFunc)
    const inputEvents = wrapper.emitted()['change']
    expect(inputEvents.length).toEqual(1)
    expect(inputEvents[0][0].every(filterFunc)).toBeTruthy()
  })

  it('addValue', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: getOptions()
      }
    })
    wrapper.vm.addValue(r => r.value === '10')
    wrapper.vm.addValue(r => r.value === '20')
    const inputEvents = wrapper.emitted()['change']
    expect(inputEvents.length).toEqual(2)
    expect(inputEvents[1][0][0].value).toEqual('10')
    expect(inputEvents[1][0][1].value).toEqual('20')
  })

  it('removeValue', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: getOptions()
      }
    })
    wrapper.vm.addValue(r => r.value === '10')
    wrapper.setProps({
      value: wrapper.emitted()['change'][0][0]
    })
    wrapper.vm.removeValue(r => r.value === '10')
    const inputEvents = wrapper.emitted()['change']
    expect(inputEvents.length).toEqual(2)
    expect(inputEvents[0][0][0].value).toEqual('10')
    expect(inputEvents[1][0]).toEqual([])
  })

  it('multiple - reset', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        value: ['01'],
        valueKey: 'value',
        optionsData: getOptions()
      }
    })
    wrapper.setData({
      keyword: 'label-01'
    })
    wrapper.vm.reset()
    const emitted = wrapper.emittedByOrder()
    expect(wrapper.vm.keyword).toEqual('')
    expect(emitted[emitted.length - 1].name).toEqual('change')
    expect(emitted[emitted.length - 1].args[0]).toEqual([])
  })

  it('single - reset', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        multiple: false,
        value: '01',
        valueKey: 'value',
        optionsData: getOptions()
      }
    })
    wrapper.setData({
      keyword: 'label-01'
    })
    wrapper.vm.reset()
    const emitted = wrapper.emittedByOrder()
    expect(wrapper.vm.keyword).toEqual('')
    expect(emitted[emitted.length - 1].name).toEqual('change')
    expect(emitted[emitted.length - 1].args[0]).toEqual(undefined)
  })
})
