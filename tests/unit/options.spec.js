import Vue from 'vue'
import { mount } from '@vue/test-utils'
import ItemListSelector from '@/'
import getOptions from './__getOptions'

const optionsData = getOptions()

describe('Option render', () => {
  it('empty', () => {
    const wrapper = mount(ItemListSelector)
    expect(wrapper.findAll('.item-selector__option').length).toBe(0)
  })

  it('default', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData
      }
    })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((el, index) => {
      expect(el.textContent).toBe(wrapper.vm.optionsData[index].label)
    })
  })

  it(':labelKey', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData,
        labelKey: 'value'
      }
    })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((el, index) => {
      expect(el.textContent).toBe(wrapper.vm.optionsData[index].value)
    })
  })

  it(':optionTemplate', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData,
        optionTemplate(option) {
          return `${option.label}---${option.value}`
        }
      }
    })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((row, index) => {
      const option = wrapper.vm.optionsData[index]
      expect(row.innerHTML).toBe(
        `<span>${option.label}---${option.value}</span>`
      )
    })
  })

  it('slot: option-template', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData,
        valueKey: 'value',
        value: ['10']
      },
      scopedSlots: {
        'option-template': `
          <div slot-scope="{ option, keyword, selected, markedHtml }">
            {{option.label}},{{option.value}},{{keyword}},{{selected}},{{markedHtml}}
          </div>
        `
      }
    })
    const keyword = 'la el'
    wrapper.setData({ keyword })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((el, index) => {
      const option = wrapper.vm.optionsData[index]
      expect(el.textContent.trim()).toBe(
        `${option.label},${option.value},${keyword},` +
          `${option.value === '10' ? 'true' : 'false'},` +
          `<mark>la</mark>b<mark>el</mark>-${option.value}`
      )
    })
  })
})

describe('Option search', () => {
  it('Single keyword', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData
      }
    })
    wrapper.setData({ debounceKeyword: 'label-1' })
    expect(wrapper.findAll('.item-selector__option').length).toBe(10)
  })

  it('Multiple Keyword', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData
      }
    })
    wrapper.setData({
      debounceKeyword: 'label-01 10 20'
    })
    expect(wrapper.findAll('.item-selector__option').length).toBe(3)
  })

  it('Unsplit keyword', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: [
          { label: 'label 01', value: '01' },
          { label: 'label 02', value: '02' }
        ],
        splitKeyword: false
      }
    })
    wrapper.setData({
      debounceKeyword: 'label 01'
    })
    expect(wrapper.findAll('.item-selector__option').length).toBe(1)
  })

  describe('Special chars', () => {
    // prettier-ignore
    const regChar = [
      '-', '[', ']', '{', '}', '(', ')', '*', '+',
      '?', '.', ',', '\\', '^', '$', '|', '#'
    ]
    const wrapper = mount(ItemListSelector, {
      propsData: {
        multiple: false,
        optionsData: regChar.map(char => ({
          label: char,
          value: char
        })),
        pageSize: 30
      }
    })

    regChar.forEach(char => {
      it(`char check: ${char}`, () => {
        wrapper.setData({
          debounceKeyword: char
        })
        expect(wrapper.vm.filtedData.length).toBe(1)
      })
    })

    it('char join', () => {
      wrapper.setData({
        debounceKeyword: regChar.join(' ')
      })
      expect(wrapper.vm.filtedData.length).toBe(regChar.length)
    })
  })
})

describe('Filter method', () => {
  const filterMethodSpy = jest.fn().mockName('filterMethodSpy')
  const wrapper = mount(ItemListSelector, {
    propsData: {
      optionsData,
      filterMethod: (option, keyword) => {
        filterMethodSpy(option, keyword)
        return `label-${option.value}` === keyword
      }
    }
  })
  wrapper.setData({ debounceKeyword: 'label-10' })

  it('Call by all options', () => {
    expect(filterMethodSpy.mock.calls.length).toBe(optionsData.length)
  })
  it('Arguments', () => {
    expect(filterMethodSpy.mock.calls).toEqual(
      optionsData.map(option => [option, 'label-10'])
    )
  })
  it('Filte result', () => {
    expect(wrapper.findAll('.item-selector__option').length).toBe(1)
  })
})

describe('Async option', () => {
  const options = getOptions()

  it('promise', async () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: new Promise(resolve => {
          resolve(options)
        })
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.internalOptions).toEqual(options)
  })

  it('callback', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: done => done(options)
      }
    })
    expect(wrapper.vm.internalOptions).toEqual(options)
  })

  it('async function', async () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        optionsData: async () => options
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.internalOptions).toEqual(options)
  })
})
