import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import markMatch from './markMatch'

@Component
export default class ItemListSelector extends Vue {
  keyword: string = ''
  curPage: number = 1
  optionActiveIndex: number = -1

  @Model('item-selection-change') selection: Object[]

  @Prop({ type: Array, default: [] }) data: Object[]
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
    return Math.ceil(this.filtedData.length / this.pageSize) || 1
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
   * 匹配高亮关键字，用于筛选时生成选项
   *
   * @private
   * @param {string} text 待处理字符
   * @returns {string} 匹配高亮后的字符
   * @memberof ItemListSelector
   */
  private highlightMatch (text: string, config: Object): string {
    return markMatch(text, this.keyword, config)
  }


  /**
   * 判断选项数据是否处于选中状态
   *
   * @private
   * @param {Object} item 待判断数据
   * @returns {boolean} 是否处于选中状态
   * @memberof ItemListSelector
   */
  private isSelected (item: Object): boolean {
    return this.selection && this.selection.indexOf(item) > -1
  }

  /**
   * 输入框键盘特殊键位处理，包括：上下移动高亮选项、前后翻页、回车选中高亮选项
   *
   * @private
   * @param {KeyboardEvent} e KeyboardEvent
   * @memberof ItemListSelector
   */
  private handleKeywordInput (e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowUp':
        this.activePrevOptions()
        break
      case 'ArrowDown':
        this.activeNextOptions()
        break
      case 'PageUp':
        e.preventDefault()
        this.goPrevPage()
        break
      case 'PageDown':
        e.preventDefault()
        this.goNextPage()
        break
      case 'Enter':
        this.toggleSelection()
        break
    }
  }

  private goPrevPage (): void {
    this.optionActiveIndex = -1
    if (this.curPage > 1) {
      this.curPage--
    }
  }

  private goNextPage (): void {
    this.optionActiveIndex = -1
    if (this.curPage < this.totalPage) {
      this.curPage++
    }
  }

  /**
   * 往前移动高亮光标
   *
   * @private
   * @memberof ItemListSelector
   */
  private activePrevOptions (): void {
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
  private activeNextOptions (): void {
    if (this.optionActiveIndex < this.showingData.length - 1) {
      this.optionActiveIndex++
    } else {
      this.optionActiveIndex = 0
    }
  }

  /**
   * 切换当前高亮选项选中状态
   *
   * @private
   * @memberof ItemListSelector
   */
  private toggleSelection (): void {
    if (this.optionActiveIndex < 0) {
      return
    }
    const item = this.showingData[this.optionActiveIndex]
    const index = this.selection.indexOf(item)
    let newSelection = [...this.selection]
    if (index > -1) {
      newSelection.splice(index, 1)
      this.$emit('add-value', item, newSelection)
    } else {
      newSelection.push(item)
      this.$emit('remove-value', item, newSelection)
    }
    this.$emit('item-selection-change', newSelection)
  }

  /**
   * 设置当前组件选项值，原有已选项会被覆盖
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  setSelection (filterFunc: (item: Object) => Boolean): void {
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "setSelection()" accept a function as argument.')
    }
    const newSelection = this.data.filter(filterFunc)
    this.$emit('item-selection-change', newSelection)
  }

  /**
   * 添加当前组件选项值，在原有已选项上添加
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  addSelect (filterFunc: (item: Object) => Boolean): void {
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "addSelect()" accept a function as argument.')
    }
    const filtedSelection = this.data.filter(item => {
      return filterFunc(item) && !this.isSelected(item)
    })
    const newSelection = [
      ...this.selection,
      ...filtedSelection
    ]
    this.$emit('item-selection-change', newSelection)
  }

  /**
   * 在已选项中筛选匹配命中 filterFunc 的选项
   *
   * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
   * @memberof ItemListSelector
   */
  removeSelect (filterFunc: (item: Object) => Boolean): void {
    if (typeof filterFunc !== 'function') {
      throw Error('[item-list-selector] "addSelect()" accept a function as argument.')
    }
    const newSelection = this.selection.filter(item => {
      return !filterFunc(item)
    })
    this.$emit('item-selection-change', newSelection)
  }

  /**
   * 重置组件状态
   *
   * @memberof ItemListSelector
   */
  reset (): void {
    this.curPage = 1
    this.keyword = ''
    this.$emit('item-selection-change', [])
  }
}
