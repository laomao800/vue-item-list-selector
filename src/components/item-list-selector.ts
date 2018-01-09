import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import markMatch from './markMatch'

@Component
export default class ItemListSelector extends Vue {
  keyword: string = ''
  curPage: number = 1
  optionActiveIndex: number = -1

  @Model('item-selection-change') selection: Object[]

  @Prop({ type: Array, default: [] }) data: Object[]
  @Prop({ type: Boolean, default: true }) usePage: Boolean
  @Prop({ type: Number, default: 10 }) pageSize: number
  @Prop({ type: String, default: '无匹配记录' }) notFoundText: string
  @Prop({ type: String, default: '请输入搜索关键字' }) searchText: string
  @Prop({ type: String, default: '上一页' }) prevPageText: string
  @Prop({ type: String, default: '下一页' }) nextPageText: string
  @Prop({
    type: Function,
    default: (option: {[propName: string]: any}): string => {
      return (option && option.label) ? option.label : ''
    }
  }) optionTemplate: (option: {[propName: string]: any}) => string

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

  highlightMatch (text: string): string {
    return markMatch(text, this.keyword)
  }

  isSelected (item: Object): boolean {
    return this.selection && this.selection.indexOf(item) > -1
  }

  handleSearchInput (e: KeyboardEvent): void {
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
        this.toggleSelection(this.optionActiveIndex)
        break
    }
  }

  goPrevPage (): void {
    this.optionActiveIndex = -1
    if (this.curPage > 1) {
      this.curPage--
    }
  }

  goNextPage (): void {
    this.optionActiveIndex = -1
    if (this.curPage < this.totalPage) {
      this.curPage++
    }
  }

  activePrevOptions (): void {
    if (this.optionActiveIndex < 1) {
      this.optionActiveIndex = this.showingData.length - 1
    } else {
      this.optionActiveIndex--
    }
  }

  activeNextOptions (): void {
    if (this.optionActiveIndex < this.showingData.length - 1) {
      this.optionActiveIndex++
    } else {
      this.optionActiveIndex = 0
    }
  }

  toggleSelection (showingIndex: number): void {
    if (showingIndex < 0) {
      return
    }
    const item = this.showingData[showingIndex]
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

  setSelection (filterFunc: {(item: Object): boolean}): void {
    this.$nextTick(() => {
      const newSelection = this.data.filter(filterFunc)
      this.$emit('item-selection-change', newSelection)
    })
  }

  addSelect (filterFunc: {(item: Object): boolean}): void {
    const filtedSelection = this.data.filter(item => {
      return filterFunc(item) && !this.isSelected(item)
    })
    const newSelection = [
      ...this.selection,
      ...filtedSelection
    ]
    this.$nextTick(() => {
      this.$emit('item-selection-change', newSelection)
    })
  }

  removeSelect (filterFun: {(item: Object): boolean}): void {
    const newSelection = this.selection.filter(item => {
      return !filterFun(item)
    })
    this.$nextTick(() => {
      this.$emit('item-selection-change', newSelection)
    })
  }

  reset (): void {
    this.curPage = 1
    this.keyword = ''
    this.$nextTick(() => {
      this.$emit('item-selection-change', [])
    })
  }
}
