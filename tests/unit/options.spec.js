import { mount } from '@vue/test-utils'
import ItemListSelector from '@/index.vue'
import getTestData from './getTestData.js'

describe('Options', () => {
  it('optionTemplate - 默认', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((row, index) => {
      expect(row.innerHTML).toEqual(wrapper.vm.data[index].label)
    })
  })

  it('optionTemplate - 自定义格式', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData(),
        optionTemplate(option) {
          return `${option.label}---${option.value}`
        }
      }
    })
    Array.from(
      wrapper.vm.$el.querySelectorAll('.item-selector__option')
    ).forEach((row, index) => {
      expect(row.innerHTML).toEqual(
        `${wrapper.vm.data[index].label}---${wrapper.vm.data[index].value}`
      )
    })
  })

  it('关键字过滤', () => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    wrapper.setData({
      keyword: 'data-1'
    })
    expect(wrapper.findAll('.item-selector__option').length).toEqual(10)
  })

  it('多关键字过滤', done => {
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: getTestData()
      }
    })
    wrapper.setData({
      keyword: 'data-01 data-10 data-20'
    })
    setTimeout(() => {
      expect(wrapper.findAll('.item-selector__option').length).toEqual(3)
      done()
    }, 200)
  })

  describe('特殊字符过滤', () => {
    const regChar = [
      '-',
      '[',
      ']',
      '{',
      '}',
      '(',
      ')',
      '*',
      '+',
      '?',
      '.',
      ',',
      '\\',
      '^',
      '$',
      '|',
      '#'
    ]
    const wrapper = mount(ItemListSelector, {
      propsData: {
        data: regChar.map(char => ({
          label: char,
          value: char
        })),
        pageSize: 30
      }
    })

    regChar.forEach(char => {
      it(`char check: ${char}`, done => {
        wrapper.setData({
          keyword: char
        })
        setTimeout(() => {
          expect(wrapper.findAll('.item-selector__option').length).toEqual(1)
          done()
        }, 200)
      })
    })

    it('char join', done => {
      wrapper.setData({
        keyword: regChar.join(' ')
      })
      setTimeout(() => {
        expect(wrapper.findAll('.item-selector__option').length).toEqual(
          regChar.length
        )
        done()
      }, 200)
    })
  })
})
