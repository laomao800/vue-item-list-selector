import Vue from 'vue'
import { mount } from '@vue/test-utils'
import ItemListSelector from '@/'
import getOptions from './__getOptions'

const optionsData = getOptions()

describe('Basic choose', () => {
  it('Multiple selection', () => {
    const wrapper = mount({
      template: `
        <ItemListSelector
          v-model="value"
          :options-data="optionsData"
        />
      `,
      components: { ItemListSelector },
      data() {
        return {
          value: [],
          optionsData
        }
      }
    })
    const $option1 = wrapper.findAll('.item-selector__option').at(0)
    const $option2 = wrapper.findAll('.item-selector__option').at(1)
    $option1.element.click()
    $option2.element.click()
    expect(wrapper.vm.value).toEqual([optionsData[0], optionsData[1]])
  })

  it('Single selection', () => {
    const wrapper = mount({
      template: `
        <ItemListSelector
          v-model="value"
          :options-data="optionsData"
          :multiple="false"
        />
      `,
      components: { ItemListSelector },
      data() {
        return {
          value: null,
          optionsData
        }
      }
    })
    const $option1 = wrapper.findAll('.item-selector__option').at(0)
    const $option2 = wrapper.findAll('.item-selector__option').at(1)
    $option1.element.click()
    expect(wrapper.vm.value).toEqual(optionsData[0])
    $option2.element.click()
    expect(wrapper.vm.value).toEqual(optionsData[1])
  })

  it('Value key (multiple)', () => {
    const wrapper = mount({
      template: `
        <ItemListSelector
          v-model="value"
          :options-data="optionsData"
          value-key="value"
        />
      `,
      components: { ItemListSelector },
      data() {
        return {
          value: [],
          optionsData
        }
      }
    })
    const $option1 = wrapper.findAll('.item-selector__option').at(0)
    const $option2 = wrapper.findAll('.item-selector__option').at(1)
    $option1.element.click()
    $option2.element.click()
    expect(wrapper.vm.value).toEqual([
      optionsData[0].value,
      optionsData[1].value
    ])
  })

  it('Value key (single)', () => {
    const wrapper = mount({
      template: `
        <ItemListSelector
          v-model="value"
          :options-data="optionsData"
          :multiple="false"
          value-key="value"
        />
      `,
      components: { ItemListSelector },
      data() {
        return {
          value: [],
          optionsData
        }
      }
    })
    const $option1 = wrapper.findAll('.item-selector__option').at(0)
    const $option2 = wrapper.findAll('.item-selector__option').at(1)
    $option1.element.click()
    $option2.element.click()
    expect(wrapper.vm.value).toBe(optionsData[1].value)
  })
})

describe('Choose by keyboard', () => {
  const wrapper = mount(ItemListSelector, {
    propsData: {
      optionsData
    }
  })
  const $input = wrapper.find('.item-selector__searchbar input')
  const ACTIVE_INDEX = 2

  it('Choose ACTIVE_INDEX', () => {
    wrapper.setData({
      activeIndex: ACTIVE_INDEX
    })
    $input.trigger('keydown.enter')
    const value = wrapper.emitted()['change'][0][0]
    expect(value.length).toBe(1)
    expect(value[0]).toEqual(wrapper.vm.optionsData[ACTIVE_INDEX])
  })

  it('Choose next...', () => {
    wrapper.setData({
      activeIndex: ACTIVE_INDEX + 1
    })
    $input.trigger('keydown.enter')
    const value = wrapper.emitted()['change'][1][0]
    expect(value.length).toBe(2)
    expect(value[1]).toEqual(wrapper.vm.optionsData[ACTIVE_INDEX + 1])
  })

  it('Revert first chosen', () => {
    wrapper.setData({
      activeIndex: ACTIVE_INDEX
    })
    $input.trigger('keydown.enter')
    const value = wrapper.emitted()['change'][2][0]
    expect(value.length).toBe(1)
    expect(value[0]).toEqual(wrapper.vm.optionsData[ACTIVE_INDEX + 1])
  })
})

describe('`change` event should trigger with default value', () => {
  const options = getOptions()

  it('promise', async () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        multiple: false,
        valueKey: 'value',
        value: '01',
        optionsData: new Promise(resolve => {
          resolve(options)
        })
      }
    })
    await Vue.nextTick()
    const emitted = wrapper.emittedByOrder()
    expect(emitted.map(r => r.name)).toEqual(['options-inited', 'change'])
    expect(emitted[1].args[0]).toEqual(options[0]['value'])
  })

  it('callback', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        multiple: false,
        valueKey: 'value',
        value: '01',
        optionsData: done => done(options)
      }
    })
    const emitted = wrapper.emittedByOrder()
    expect(emitted.map(r => r.name)).toEqual(['options-inited', 'change'])
    expect(emitted[1].args[0]).toEqual(options[0]['value'])
  })

  it('async function', async () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        multiple: false,
        valueKey: 'value',
        value: '01',
        optionsData: async () => options
      }
    })
    await Vue.nextTick()
    const emitted = wrapper.emittedByOrder()
    expect(emitted.map(r => r.name)).toEqual(['options-inited', 'change'])
    expect(emitted[1].args[0]).toEqual(options[0]['value'])
  })
})
