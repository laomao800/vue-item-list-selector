<template>
  <div class="item-selector">
    <div class="item-selector__searchbar">
      <div class="item-selector__searchbar-inner">
        <div class="item-selector__searchbar-icon">
          <span class="clean" v-if="keyword !== ''" @click="keyword = ''"><i class="fa fa-times"></i></span>
          <span v-else><i class="fa fa-search"></i></span>
        </div>
        <input autofocus type="text" :placeholder="searchText" v-model.trim="keyword" @keyup="handleSearchInput($event)">
      </div>
    </div>
    <div class="item-selector__result">
      <ul class="item-selector__options">
        <li v-for="item, index in showingData" class="item-selector__option"
          :class="{
            'option-checked': isSelected(item),
            'option-active': index === optionActiveIndex
          }"
          v-html="highlightMatch(optionTemplate(item))"
          @click="toggleSelection(index)" />
        <li v-if="showingData.length === 0" class="item-selector__option-notfound">{{ notFoundText }}</li>
      </ul>
    </div>
    <div class="item-selector__page">
      <span @click="goPrevPage"
        class="pagelink pagelink-prev"
        :class="{ 'pagelink-disabled': curPage === 1 }">{{ prevPageText }}</span>
      <span class="page-num">
        <span class="cur">{{ curPage }}</span>
        <span class="spe">/</span>
        <span class="total">{{ totalPage }}</span>
      </span>
      <span @click="goNextPage"
        class="pagelink pagelink-next"
        :class="{ 'pagelink-disabled': curPage === totalPage }">{{ nextPageText }}</span>
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

  @Model('item-selection-change') selection: Object[]

  @Prop({ type: Array, default: [] }) data: Object[]

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
  })
  optionTemplate: (option: {[propName: string]: any}) => string

  get showingData (): Object[] {
    return [...this.filtedData].splice((this.curPage - 1) * this.pageSize, this.pageSize)
  }

  get filtedData (): Object[] {
    return this.keyword === ''
      ? [...this.data]
      : this.data.filter(r => {
        return this.optionTemplate(r).toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      })
  }

  get totalPage (): number {
    return Math.ceil(this.filtedData.length / this.pageSize) || 1
  }

  @Watch('keyword')
  onKeywordChanged (val: string, oldVal: string): void {
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
</script>

<style lang="scss" src="./item-list-selector.scss"></style>
