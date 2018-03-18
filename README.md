# item-list-selector [![Build Status](https://travis-ci.org/laomao800/vue-item-list-selector.svg?branch=master)](https://travis-ci.org/laomao800/vue-item-list-selector) [![codecov](https://codecov.io/gh/laomao800/vue-item-list-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/vue-item-list-selector) [![npm](https://img.shields.io/npm/v/@laomao800/vue-item-list-selector.svg)](https://www.npmjs.com/package/@laomao800/vue-item-list-selector)

## 安装

```bash
# npm
npm install --save-dev @laomao800/vue-item-list-selector

# yarn
yarn add @laomao800/vue-item-list-selector
```

## 效果

[在线 DEMO](https://jsfiddle.net/)

## 基础用法

```vue
<template>
  <div>
    <item-list-selector
      ref="itemListSelector"
      v-model="selected"
      :data="listData">
    </item-list-selector>
  </div>
</template>

<script>
import itemListSelector from '@laomao800/vue-item-list-selector'

export default {
  components: { itemListSelector },
  data () {
    return {
      selected: [],
      listData: [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 }
      ]
    }
  }
}
</script>
```

## Props

| prop           | default | 说明
| -------------- | ------- | ----
| data           | []      | 所有待选数据
| usePage        | true    | 是否启用分页
| pageSize       | 10      | 启用分页时每页数量
| notFoundText   | '无匹配记录' | -
| searchText     | '请输入搜索关键字' | -
| prevPageText   | '上一页' | -
| nextPageText   | '下一页' | -
| optionTemplate | `(option) => (option && option.label) ? option.label : ''` | 自定义选项展示模板

## Events

| Event            | 参数      |
| ---------------- | --------- |
| selection-remove | (removeItem, newSelection) |
| selection-add    | (addItem, newSelection) |
| selection-change | (newSelection) |

## Methods

| Methods         | 参数           | 说明
| --------------- | -------------- | ----
| setSelection    | function (row) | 设置选中项，新选中内容会覆盖原有选中内容
| addSelection    | function (row) | 在原选中内容基础上增加选中项
| removeSelection | function (row) | 从选中项中移除数据

每个方法都接受一个过滤函数 function (row) 用于应用选中，参数 `row` 为遍历 prop `data` 的每一行，返回 `true` 则代表命中。

```javascript
// ...
this.$refs.itemListSelector.setSelection((row) => row.value === 1)
```
