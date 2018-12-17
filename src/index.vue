<template>
  <div class="item-selector">
    <div class="item-selector__searchbar">
      <span v-if="keyword !== ''" class="item-selector__searchbar-clean" @click="keyword = ''"/>
      <input
        v-model.trim="keyword"
        type="text"
        :placeholder="searchText"
        @keydown.up.prevent="activePrevOptions"
        @keydown.down.prevent="activeNextOptions"
        @keydown.enter.prevent="toggleSelection"
      >
    </div>

    <div v-if="filtedData.length === 0" class="item-selector__options--empty">{{ notFoundText }}</div>
    <virtual-list
      v-else
      ref="options"
      :key="debounceKeyword"
      :start="startIndex"
      :size="optionHeight"
      :remain="optionsRemain"
      :bench="optionsBench"
      class="item-selector__options-wrap"
      wtag="ul"
      wclass="item-selector__options"
    >
      <li
        v-for="(item, index) in filtedData"
        :key="index"
        :class="[
          'item-selector__option',
          {
            'item-selector__option--checked': isSelected(item),
            'item-selector__option--active': index === optionActiveIndex
          }
        ]"
        @click="toggleSelection(index)"
        @mouseenter="optionActiveIndex = index"
        v-html="highlightMatch(optionTemplate(item))"
      />
    </virtual-list>
  </div>
</template>

<script>
import xor from 'lodash/xor'
import union from 'lodash/union'
import isEqual from 'lodash/isEqual'
import throttle from 'lodash/throttle'
import VirtualList from 'vue-virtual-scroll-list'
import computeScrollIntoView from 'compute-scroll-into-view'
import markMatch from './markMatch'
import './style.less'

export default {
  name: 'ItemListSelector',

  components: {
    VirtualList
  },

  model: {
    prop: 'selection',
    event: 'selection-change'
  },

  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    selection: {
      type: [Array, Object],
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    notFoundText: { type: String, default: '无匹配记录' },
    searchText: { type: String, default: '请输入搜索关键字' },
    optionTemplate: {
      type: Function,
      default: option => (option.hasOwnProperty('label') ? option.label : '')
    },
    optionHeight: { type: Number, default: 34 },
    optionsRemain: { type: Number, default: 6 },
    optionsBench: { type: Number, default: 60 }
  },

  data() {
    return {
      keyword: '',
      debounceKeyword: '',
      startIndex: 0,
      optionActiveIndex: -1
    }
  },

  computed: {
    filtedData() {
      const keyword = this.debounceKeyword
      if (!keyword) {
        return this.data
      } else {
        const validKeywords = keyword.split(' ').filter(text => text)
        const correctKeywords = validKeywords
          .map(word => word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
          .join('|')
        const keywordReg = RegExp(correctKeywords, 'gi')
        return this.data.filter(r =>
          this.optionTemplate(r)
            .toString()
            .match(keywordReg)
        )
      }
    },
    selectionArr() {
      return this.multiple ? this.selection : [this.selection]
    }
  },

  watch: {
    keyword() {
      this.throttleKeyword()
    },
    debounceKeyword() {
      this.startIndex = 0
      this.optionActiveIndex = -1
    }
  },

  methods: {
    throttleKeyword: throttle(function() {
      this.debounceKeyword = this.keyword
    }, 200),

    // 重置组件状态
    reset() {
      this.keyword = ''
      this.syncSelection([])
    },

    // 匹配高亮关键字，用于筛选时生成选项
    highlightMatch(text, config) {
      return this.debounceKeyword
        ? markMatch(text, this.debounceKeyword, config)
        : text
    },

    // 判断选项数据是否处于选中状态
    isSelected(item) {
      return this.selectionArr.indexOf(item) > -1
    },

    activePrevOptions() {
      if (this.optionActiveIndex === 0) {
        this.optionActiveIndex = this.filtedData.length - 1
        this.startIndex = this.filtedData.length
      } else {
        this.optionActiveIndex--
        this.scrollActiveOptionToView('prev')
      }
    },

    activeNextOptions() {
      if (this.optionActiveIndex < this.filtedData.length - 1) {
        this.optionActiveIndex++
        this.scrollActiveOptionToView('next')
      } else {
        this.optionActiveIndex = 0
        this.startIndex = 0
      }
    },

    toggleSelection(index) {
      const targetIndex =
        typeof index === 'number' ? index : this.optionActiveIndex
      const item = this.filtedData[targetIndex]
      // istanbul ignore if
      if (!item) return

      let newSelection = []
      if (!this.multiple) {
        newSelection = [item]
      } else {
        // xor 异或实现选项 toggle 效果
        newSelection = xor(this.selectionArr, [item])
      }
      this.syncSelection(newSelection)
    },

    syncSelection(selection) {
      const newSelection = this.multiple ? selection : selection[0] || {}
      if (!isEqual(newSelection, this.selection)) {
        this.$emit('selection-change', newSelection)
      }
    },

    async scrollActiveOptionToView(direction) {
      await this.$nextTick()
      const options = this.$refs.options.$el
      const option = options.querySelector('.item-selector__option--active')
      if (option) {
        const actions = computeScrollIntoView(option, {
          scrollMode: 'if-needed',
          block: 'nearest',
          inline: 'nearest'
        })
        actions.forEach(({ el, top, left }) => {
          el.scrollTop = top
          el.scrollLeft = left
        })
      } else {
        const _factor = direction === 'prev' ? -1 : 1
        options.scrollTo({
          top: options.scrollTop + this.optionHeight * _factor
        })
      }
    },

    // 设置当前组件选项值，原有已选项会被覆盖
    setSelection(filterFunc) {
      // istanbul ignore if
      if (typeof filterFunc !== 'function') {
        throw Error(
          '[item-list-selector] "setSelection()" accept a function as argument.'
        )
      }
      const newSelection = this.data.filter(filterFunc)
      this.syncSelection(newSelection)
    },

    // 添加当前组件选项值，在原有已选项上添加
    addSelection(filterFunc) {
      // istanbul ignore if
      if (!this.multiple) {
        // 单选模式下无法使用本方法
        throw Error(
          '[item-list-selector] "addSelection()" only works on multiple mode.'
        )
      }
      // istanbul ignore if
      if (typeof filterFunc !== 'function') {
        throw Error(
          '[item-list-selector] "addSelection()" accept a function as argument.'
        )
      }
      const filtedSelection = this.data.filter(filterFunc)
      const newSelection = union(this.selectionArr, filtedSelection)
      this.syncSelection(newSelection)
    },

    // 在已选项中匹配命中 filterFunc 的选项
    removeSelection(filterFunc) {
      // istanbul ignore if
      if (typeof filterFunc !== 'function') {
        throw Error(
          '[item-list-selector] "removeSelection()" accept a function as argument.'
        )
      }
      const newSelection = this.selectionArr.filter(item => !filterFunc(item))
      this.syncSelection(newSelection)
    }
  }
}
</script>
