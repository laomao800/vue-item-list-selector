<template>
  <div class="item-selector">
    <div class="item-selector__searchbar">
      <div class="item-selector__searchbar-inner">
        <div v-if="keyword !== ''" @click="keyword = ''" class="item-selector__searchbar-clean"></div>
        <input type="text" :placeholder="searchText" v-model.trim="keyword" @keyup="handleKeywordInput($event)">
      </div>
    </div>
    <div class="item-selector__result">
      <ul class="item-selector__options">
        <li v-if="showingData.length === 0" class="item-selector__option-notfound">{{ notFoundText }}</li>
        <li v-for="(item, index) in showingData"
          :key="index"
          :class="[
            'item-selector__option',
            {
              'option-checked': isSelected(item),
              'option-active': index === optionActiveIndex
            }
          ]"
          v-html="highlightMatch(optionTemplate(item))"
          @click="toggleSelection(index)" />
      </ul>
    </div>
    <div class="item-selector__page" v-if="usePage">
      <span @click="goPrevPage"
        :class="['pagelink', 'pagelink-prev', { 'pagelink-disabled': curPage === 1 }]">{{ prevPageText }}</span>
      <span class="page-num">
        <span class="cur">{{ curPage }}</span>
        <span class="spe">/</span>
        <span class="total">{{ totalPage }}</span>
      </span>
      <span @click="goNextPage"
        :class="['pagelink', 'pagelink-next', { 'pagelink-disabled': curPage === totalPage }]">{{ nextPageText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import markMatch from './markMatch'

@Component
export default class ItemListSelector extends Vue {
  keyword: string = ''
  curPage: number = 1
  optionActiveIndex: number = -1

  @Prop({ type: Array, default: (): Array<Object> => [] })
  @Model('selection-change') selection: Array<Object>

  @Prop({ type: Array, default: (): Array<Object> => [] }) data: Array<Object>
  @Prop({ type: Boolean, default: true }) usePage: boolean
  @Prop({ type: Number, default: 10 }) pageSize: number
  @Prop({ type: String, default: '无匹配记录' }) notFoundText: string
  @Prop({ type: String, default: '请输入搜索关键字' }) searchText: string
  @Prop({ type: String, default: '上一页' }) prevPageText: string
  @Prop({ type: String, default: '下一页' }) nextPageText: string
  @Prop({
    type: Function,
    default: (option: {[propName: string]: any}): string => (option && option.label) ? option.label : ''
  }) optionTemplate: (option: Object) => string

  /**
   * 返回当前可选项分页后用于展示的数据
   *
   * @readonly
   * @type {Object[]}
   * @memberof ItemListSelector
   */
  get showingData (): Object[] {
    if (this.usePage) {
      return [...this.filtedData].splice((this.curPage - 1) * this.pageSize, this.pageSize)
    } else {
      return this.filtedData
    }
  }

  /**
   * 根据关键字返回匹配过滤结果
   *
   * @readonly
   * @type {Object[]}
   * @memberof ItemListSelector
   */
  get filtedData (): Object[] {
    return this.keyword === ''
      ? [...this.data]
      : this.data.filter(r => {
        return this.optionTemplate(r).toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      })
  }

  /**
   * 根据过滤结果计算分页总页码
   *
   * @readonly
   * @type {number}
   * @memberof ItemListSelector
   */
  get totalPage (): number {
    return this.usePage
      ? Math.ceil(this.filtedData.length / this.pageSize) || 1
      : 1
  }

  /**
   * 关键字有变动则结果重设回第一页
   *
   * @memberof ItemListSelector
   */
  @Watch('keyword')
  onKeywordChanged (): void {
    this.curPage = 1
    this.optionActiveIndex = -1
  }

  /**
   * 设置当前组件选项值，原有已选项会被覆盖
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  setSelection (filterFunc: (item: Object) => Boolean): void {
    // istanbul ignore if
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "setSelection()" accept a function as argument.')
    }
    const newSelection = this.data.filter(filterFunc)
    this.$emit('selection-change', newSelection)
  }

  /**
   * 添加当前组件选项值，在原有已选项上添加
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  addSelection (filterFunc: (item: Object) => Boolean): void {
    // istanbul ignore if
    // tslint:disable-next-line
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "addSelection()" accept a function as argument.')
    }
    const filtedSelection = this.data.filter(item => {
      return filterFunc(item) && !this.isSelected(item)
    })
    const newSelection = [
      ...this.selection,
      ...filtedSelection
    ]
    this.$emit('selection-change', newSelection)
  }

  /**
   * 在已选项中匹配命中 filterFunc 的选项
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  removeSelection (filterFunc: (item: Object) => Boolean): void {
    // istanbul ignore if
    // tslint:disable-next-line
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "removeSelection()" accept a function as argument.')
    }
    const newSelection = this.selection.filter(item => {
      return !filterFunc(item)
    })
    this.$emit('selection-change', newSelection)
  }

  /**
   * 重置组件状态
   *
   * @memberof ItemListSelector
   */
  reset (): void {
    this.curPage = 1
    this.keyword = ''
    this.$emit('selection-change', [])
  }

  /**
   * 匹配高亮关键字，用于筛选时生成选项
   *
   * @private
   * @param {string} text 待处理字符
   * @returns {string} 匹配高亮后的字符
   * @memberof ItemListSelector
   */
  highlightMatch (text: string, config: Object): string {
    return this.keyword
      ? markMatch(text, this.keyword, config)
      : text
  }

  /**
   * 判断选项数据是否处于选中状态
   *
   * @private
   * @param {Object} item 待判断数据
   * @returns {boolean} 是否处于选中状态
   * @memberof ItemListSelector
   */
  isSelected (item: Object): boolean {
    return this.selection && this.selection.indexOf(item) > -1
  }

  /**
   * 输入框键盘特殊键位处理，包括：上下移动高亮选项、前后翻页、回车选中高亮选项
   *
   * @private
   * @param {KeyboardEvent} e KeyboardEvent
   * @memberof ItemListSelector
   */
  handleKeywordInput (e: KeyboardEvent): void {
    switch (e.keyCode) {
      case 38:
        this.activePrevOptions()
        break
      case 40:
        this.activeNextOptions()
        break
      case 33:
        e.preventDefault()
        this.goPrevPage()
        break
      case 34:
        e.preventDefault()
        this.goNextPage()
        break
      case 13:
        this.toggleSelection(this.optionActiveIndex)
        break
    }
  }

  goPrevPage (): void {
    this.optionActiveIndex = -1
    this.curPage = Math.max(this.curPage - 1, 1)
  }

  goNextPage (): void {
    this.optionActiveIndex = -1
    this.curPage = Math.min(this.curPage + 1, this.totalPage)
  }

  /**
   * 往前移动高亮光标
   *
   * @private
   * @memberof ItemListSelector
   */
  activePrevOptions (): void {
    if (this.optionActiveIndex < 1) {
      this.optionActiveIndex = this.showingData.length - 1
    } else {
      this.optionActiveIndex--
    }
  }

  /**
   * 往后移动高亮光标
   *
   * @private
   * @memberof ItemListSelector
   */
  activeNextOptions (): void {
    if (this.optionActiveIndex < this.showingData.length - 1) {
      this.optionActiveIndex++
    } else {
      this.optionActiveIndex = 0
    }
  }

  /**
   * 切换选项选中状态，
   * 用于切换当前高亮选项选中状态、鼠标点击选项
   *
   * @private
   * @memberof ItemListSelector
   */
  toggleSelection (targetIndex: number): void {
    const item = this.showingData[targetIndex]
    // istanbul ignore if
    if (!item) {
      return
    }
    const index = this.selection.indexOf(item)
    let newSelection = [...this.selection]
    if (index > -1) {
      newSelection.splice(index, 1)
      this.$emit('selection-remove', item, newSelection)
    } else {
      newSelection.push(item)
      this.$emit('selection-add', item, newSelection)
    }
    this.$emit('selection-change', newSelection)
  }
}
</script>

<style lang="less" src="./item-list-selector.less"></style>
