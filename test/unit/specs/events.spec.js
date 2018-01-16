import ItemListSelector from '@/components/item-list-selector.vue'
import { mount } from '@vue/test-utils'
import { getTestData } from './utils.js'

describe('Events', () => {
  const wrapper = mount(ItemListSelector, {
    propsData: {
      data: getTestData(),
      selection: []
    }
  })
  const $input = wrapper.find('.item-selector__searchbar-inner input')

  it('鼠标点击选项', () => {
    wrapper.findAll('.item-selector__option').at(0).element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][0][0] })
    wrapper.findAll('.item-selector__option').at(1).element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][1][0] })
    wrapper.findAll('.item-selector__option').at(1).element.click()
    wrapper.setProps({ selection: wrapper.emitted()['selection-change'][2][0] })
    expect(wrapper.vm.selection.length).toEqual(1)
    expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[0])
    expect(wrapper.emittedByOrder().map(r => r.name)).toEqual([
      'selection-add',
      'selection-change',
      'selection-add',
      'selection-change',
      'selection-remove',
      'selection-change'
    ])
  })

  it('下箭头移动高亮选项', () => {
    wrapper.setData({
      optionActiveIndex: 2
    })
    expect(wrapper.findAll('.item-selector__option.option-active').length).toEqual(1)
    $input.trigger('keyup.down')
    expect(wrapper.vm.optionActiveIndex).toEqual(3)
    $input.trigger('keyup.down')
    expect(wrapper.vm.optionActiveIndex).toEqual(4)
  })

  it('在底部选项边缘，下箭头移动高亮选项到第一项', () => {
    wrapper.setData({
      optionActiveIndex: wrapper.vm.showingData.length - 1
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
    expect(wrapper.vm.optionActiveIndex).toEqual(wrapper.vm.showingData.length - 1)
  })

  it('Pagedown 下一页', () => {
    wrapper.setData({
      curPage: 1
    })
    $input.trigger('keyup.pagedown')
    expect(wrapper.vm.curPage).toEqual(2)
  })

  it('Pageup 上一页', () => {
    wrapper.setData({
      curPage: 2
    })
    $input.trigger('keyup.pageup')
    expect(wrapper.vm.curPage).toEqual(1)
  })

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
      // 需显式运行 setProps 触发 v-model 的自定义 model 修改
      $selector.setProps({
        selection: wrapper.vm.selection
      })
      const selection = wrapper.vm.selection
      expect(selection.length).toEqual(1)
      expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX])
    })

    it('选择下一项', () => {
      $selector.setData({
        optionActiveIndex: ACTIVE_INDEX + 1
      })
      $input.trigger('keyup.enter')
      // 需显式运行 setProps 触发 v-model 的自定义 model 修改
      $selector.setProps({
        selection: wrapper.vm.selection
      })
      const selection = wrapper.vm.selection
      expect(selection.length).toEqual(2)
      expect(wrapper.vm.selection[1]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
    })

    it('取消第一次选择的数据', () => {
      $selector.setData({
        optionActiveIndex: ACTIVE_INDEX
      })
      $input.trigger('keyup.enter')
      $selector.setProps({
        selection: wrapper.vm.selection
      })
      const selection = wrapper.vm.selection
      expect(selection.length).toEqual(1)
      expect(wrapper.vm.selection[0]).toEqual(wrapper.vm.data[ACTIVE_INDEX + 1])
    })
  })
})
