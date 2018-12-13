# item-list-selector [![Build Status](https://travis-ci.org/laomao800/vue-item-list-selector.svg?branch=master)](https://travis-ci.org/laomao800/vue-item-list-selector) [![codecov](https://codecov.io/gh/laomao800/vue-item-list-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/vue-item-list-selector) [![npm](https://img.shields.io/npm/v/@laomao800/vue-item-list-selector.svg)](https://www.npmjs.com/package/@laomao800/vue-item-list-selector)

## 安装

```bash
# npm
npm install --save @laomao800/vue-item-list-selector

# yarn
yarn add @laomao800/vue-item-list-selector
```

## 基础用法

```vue
<template>
  <div id="app">
    <div style="float:left;width:300px;">
      <ItemListSelector v-model="selected" :data="listData" />
    </div>
    <pre style="overflow:hidden;padding: 0 20px;">{{ selected }}</pre>
  </div>
</template>

<script>
import ItemListSelector from '@laomao800/vue-item-list-selector'

function randomText(length = 20) {
  return [...Array(length)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  name: 'App',
  components: { ItemListSelector },
  data: () => ({
    selected: [],
    listData: Array(6000)
      .fill()
      .map((v, i) => ({
        label: `${i} - ${randomText()}`,
        value: i
      }))
  })
}
</script>
```

## Props

| prop           | default            | 说明                        |
| -------------- | ------------------ | --------------------------- |
| data           | []                 | 所有待选数据                |
| multiple       | `true`             | 是否多选                    |
| selection      | []                 | 选中值，可通过 v-model 绑定 |
| notFoundText   | '无匹配记录'       | -                           |
| searchText     | '请输入搜索关键字' | -                           |
| optionTemplate |                    | 自定义选项展示模板          |
| optionHeight   | 34                 | 选项样式高度                |
| optionsRemain  | 6                  | 默认显示选项数量            |
| optionsBench   | 60                 | 虚拟滚动效果屏幕外选项数量  |

```js
// optionTemplate 默认值
optionTemplate: option => (option.hasOwnProperty('label') ? option.label : '')
```

## Events

| Event            | 参数         |
| ---------------- | ------------ |
| selection-change | newSelection |

## Methods

| Methods         | 参数           | 说明                                     |
| --------------- | -------------- | ---------------------------------------- |
| setSelection    | function (row) | 设置选中项，新选中内容会覆盖原有选中内容 |
| addSelection    | function (row) | 在原选中内容基础上增加选中项             |
| removeSelection | function (row) | 从选中项中移除数据                       |

每个方法都接受一个过滤函数 function (row) 用于应用选中，参数 `row` 为遍历 prop `data` 的每一行，返回 `true` 则代表命中。

```javascript
// ...
this.$refs.itemListSelector.setSelection((row) => row.value === 1)
```
