<template>
  <div
    class="item-selector"
    @keydown.up.prevent="activePrevOptions"
    @keydown.down.prevent="activeNextOptions"
    @keydown.enter.prevent="toggleSelection(activeIndex)"
  >
    <div class="item-selector__searchbar">
      <span
        v-if="keyword !== ''"
        class="item-selector__searchbar-clean"
        @click="keyword = ''"
      />
      <input v-model.trim="keyword" :placeholder="searchText" type="text" />
    </div>

    <div v-if="filtedData.length === 0" class="item-selector__options--empty">
      {{ loading ? loadingText : notFoundText }}
    </div>
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
        v-for="(option, index) in filtedData"
        :key="index"
        :class="[
          'item-selector__option',
          {
            'item-selector__option--checked': isSelected(option),
            'item-selector__option--active': index === activeIndex
          }
        ]"
        @click="toggleSelection(index)"
        @mouseenter="activeIndex = index"
      >
        <slot
          name="option-template"
          v-bind="{
            option,
            keyword,
            selected: isSelected(option),
            markedHtml: highlightMatch(optionToString(option))
          }"
        >
          <span v-html="highlightMatch(optionToString(option))" />
        </slot>
      </li>
    </virtual-list>
  </div>
</template>

<style lang="less" src="./style.less"></style>

<script>
import xor from 'lodash/xor'
import union from 'lodash/union'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import throttle from 'lodash/throttle'
import VirtualList from 'vue-virtual-scroll-list'
import computeScrollIntoView from 'compute-scroll-into-view'
import {
  markMatch,
  markExactMatch,
  hasMatch,
  hasExactMatch
} from '@laomao800/mark-match'

import { isPromise, isFunction, isArray, getObjVal } from './utils'

export default {
  name: 'ItemListSelector',

  components: {
    VirtualList
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      default: () => []
    },
    optionsData: {
      type: [Array, Function, Promise],
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    },
    notFoundText: {
      type: String,
      default: 'No results'
    },
    searchText: {
      type: String,
      default: 'Search'
    },
    splitKeyword: {
      type: Boolean,
      default: true
    },
    matchTemplate: {
      type: Function,
      default: t => `<mark>${t}</mark>`
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String
    },
    filterMethod: {
      type: Function
    },
    optionTemplate: {
      type: Function
    },
    optionHeight: {
      type: Number,
      default: 34
    },
    optionsRemain: {
      type: Number,
      default: 6
    },
    optionsBench: {
      type: Number,
      default: 6
    }
  },

  data() {
    return {
      internalValue: [],
      internalOptions: [],
      loading: false,
      keyword: '',
      debounceKeyword: '',
      startIndex: 0,
      activeIndex: -1
    }
  },

  computed: {
    filtedData() {
      const keyword = this.debounceKeyword
      if (!keyword) {
        return this.internalOptions
      } else {
        let filterMethod
        if (this.filterMethod) {
          filterMethod = this.filterMethod
        } else {
          const matchFn = this.splitKeyword ? hasMatch : hasExactMatch
          filterMethod = (option, kw) => {
            let optionStr
            try {
              optionStr = this.optionToString(option).toString()
            } catch (e) {}
            return optionStr && matchFn(optionStr, kw)
          }
        }
        return this.internalOptions.filter(option =>
          filterMethod(option, keyword)
        )
      }
    },
    optionToString() {
      return (
        this.optionTemplate ||
        (option =>
          isPlainObject(option) && this.labelKey
            ? option[this.labelKey]
            : option)
      )
    }
  },

  watch: {
    keyword() {
      this.throttleKeyword()
    },
    debounceKeyword() {
      this.startIndex = 0
      this.activeIndex = -1
    },
    value: 'initValue',
    optionsData: 'initOptionsData'
  },

  created() {
    /* istanbul ignore if */
    if (this.multiple && !Array.isArray(this.value)) {
      // eslint-disable-next-line no-console
      console.error(
        '[ItemListSelect error] Expected array with v-model/value in multiple mode, got ' +
          typeof this.value +
          ' with value',
        this.value
      )
    }
    this.initOptionsData()
  },

  methods: {
    initOptionsData() {
      const done = newOptions => {
        /* istanbul ignore else */
        if (Array.isArray(newOptions)) {
          this.internalOptions = newOptions
          this.loading = false
          this.initValue()
        }
      }
      const optionsData = this.optionsData
      /* istanbul ignore else */
      if (isArray(optionsData)) {
        done(optionsData)
      } else if (isFunction(optionsData)) {
        this.loading = true
        const fnResult = optionsData(done)
        if (isPromise(fnResult)) {
          fnResult.then(data => done(data))
        }
      } else if (isPromise(optionsData)) {
        this.loading = true
        optionsData.then(data => done(data))
      }
    },

    initValue() {
      if (this.multiple) {
        this.internalValue = this.internalOptions.filter(
          option => this.value.indexOf(getObjVal(option, this.valueKey)) > -1
        )
      } else {
        const val = this.internalOptions.find(
          option => this.value === getObjVal(option, this.valueKey)
        )
        this.internalValue = val ? [val] : []
      }
      this.syncValue(this.internalValue)
    },

    syncValue(newVal) {
      if (!isEqual(newVal, this.internalValue)) {
        let emitVal
        if (this.multiple) {
          emitVal = this.valueKey
            ? newVal.map(option => getObjVal(option, this.valueKey))
            : newVal
        } else {
          emitVal = getObjVal(newVal[0], this.valueKey)
        }
        this.internalValue = newVal
        this.$emit('change', emitVal)
      }
    },

    throttleKeyword: throttle(function() {
      this.debounceKeyword = this.keyword
    }, 200),

    isSelected(item) {
      return this.internalValue.indexOf(item) > -1
    },

    highlightMatch(text) {
      const matchFn = this.splitKeyword ? markMatch : markExactMatch
      return this.debounceKeyword
        ? matchFn(text, this.debounceKeyword, this.matchTemplate)
        : text
    },

    activePrevOptions() {
      if (this.activeIndex > 0) {
        this.activeIndex--
        this.scrollActiveOptionToView('prev')
      } else {
        this.activeIndex = this.filtedData.length - 1
        this.startIndex = this.filtedData.length
      }
    },

    activeNextOptions() {
      if (this.activeIndex < this.filtedData.length - 1) {
        this.activeIndex++
        this.scrollActiveOptionToView('next')
      } else {
        this.activeIndex = 0
        this.startIndex = 0
      }
    },

    toggleSelection(index) {
      const targetItem = this.filtedData[index]
      // istanbul ignore if
      if (!targetItem) return

      let newSelection = []
      if (this.multiple) {
        newSelection = xor(this.internalValue, [targetItem])
      } else {
        newSelection = [targetItem]
      }
      this.syncValue(newSelection)
    },

    scrollActiveOptionToView() {
      this.$nextTick().then(() => {
        const options = this.$refs.options.$el
        const option = options.querySelector('.item-selector__option--active')
        try {
          const actions = computeScrollIntoView(option, {
            scrollMode: 'if-needed',
            block: 'nearest',
            inline: 'nearest'
          })
          actions.forEach(({ el, top, left }) => {
            el.scrollTop = top
            el.scrollLeft = left
          })
        } catch (error) {}
      })
    },

    setValue(filterFn) {
      // istanbul ignore if
      if (typeof filterFn !== 'function') {
        throw Error(
          '[ItemListSelect Error] "setValue()" accept a function as argument.'
        )
      }
      const newSelection = this.internalOptions.filter(filterFn)
      this.syncValue(newSelection)
    },

    addValue(filterFn) {
      // istanbul ignore if
      if (!this.multiple) {
        throw Error(
          '[ItemListSelect Error] "addValue()" only works on multiple mode.'
        )
      }
      // istanbul ignore if
      if (typeof filterFn !== 'function') {
        throw Error(
          '[ItemListSelect Error] "addValue()" accept a function as argument.'
        )
      }
      const filtedSelection = this.internalOptions.filter(filterFn)
      const newSelection = union(this.internalValue, filtedSelection)
      this.syncValue(newSelection)
    },

    removeValue(filterFn) {
      // istanbul ignore if
      if (typeof filterFn !== 'function') {
        throw Error(
          '[ItemListSelect Error] "removeValue()" accept a function as argument.'
        )
      }
      const newSelection = this.internalValue.filter(item => !filterFn(item))
      this.syncValue(newSelection)
    },

    reset() {
      this.keyword = ''
      this.syncValue([])
    }
  }
}
</script>
