# item-list-selector

[![Build Status](https://travis-ci.org/laomao800/vue-item-list-selector.svg?branch=master)](https://travis-ci.org/laomao800/vue-item-list-selector)
[![codecov](https://codecov.io/gh/laomao800/vue-item-list-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/vue-item-list-selector)
[![npm](https://img.shields.io/npm/v/@laomao800/vue-item-list-selector.svg)](https://www.npmjs.com/package/@laomao800/vue-item-list-selector)

## Install

```bash
# npm
npm install --save @laomao800/vue-item-list-selector

# yarn
yarn add @laomao800/vue-item-list-selector
```

## Documentation

[中文](https://laomao800.github.io/vue-item-list-selector/zh/) | [English](https://laomao800.github.io/vue-item-list-selector/)

## Usege

```vue
<template>
  <ItemListSelector
    v-model="value"
    :options-data="optionsData"
  />
</template>

<script>
import ItemListSelector from '@laomao800/ItemListSelector'

export default {
  components: { ItemListSelector },
  data() {
    return {
      value: [],
      optionsData: [
        { label: 'label-1', value: 1 },
        { label: 'label-2', value: 2 },
        { label: 'label-3', value: 3 },
        { label: 'label-4', value: 4 }
      ]
    }
  }
}
</script>
```

## Props

### value/v-model

- type: Function
- default: `[]`

Binding value. Should be an array when multi-select mode.

### optionsData

- type: Array/Promise/Function
- default: `[]`

The array of options. When the item is the object, it can work with `labelKey` and `valueKey` to configure the option text property and the property to be submitted to value.

When the type is a function, it can return directly or use the callback function in the params to resolve the result.

```js
{
  optionsData: (done) => {
    const result = []
    // return result
    // or
    // some sync/async works
    done(result)
  }
}
```

### multiple

- type: Boolean
- default: `true`

Whether multi-select mode

### loadingText

- type: String
- default: `'Loading...'`

Text display when async `optionsData` resolving data.

### notFoundText

- type: String
- default: `'No results'`

Text display when no matching search results.

### searchText

- type: String
- default: `'Search'`

Search text input's Placeholder

### splitKeyword

- type: Boolean
- default: `true`

Whether to use space-separated keywords when searching.

### matchTemplate

- type: Function
- default: t => \`&lt;mark&gt;${t}&lt;/mark&gt;\`

Matching text formatter.

### labelKey

- type: String
- default: `'label'`

Specify the label text property while `optionsData` item is an object.

If `optionTemplate` is not configured, the property value will also be used as the search text of the internal default filter method.

### valueKey

- type: String
- default: `undefined`

Specify the binding `value/v-model` property while `optionsData` item is an object.

You can also use this property to help bind default values:

```js
data() {
  return {
    value: 1
    optionsData: [
      { label: 'label-1', value: 1 },
      { label: 'label-2', value: 2 }
    ]
  }
}
```

### optionTemplate

- type: Function
- default: `undefined`
- params: (option)

Custom option label format function. Should return a string, and the return content will also use as a search text for the internal default filter method.

To customize the option's html content should use the slot [option-template](#option-template) .

### filterMethod

- type: Function
- default: `undefined`
- params: (option, keyword)

Custom item filter method. Param `option` is item from options array, `keyword` is the current query keyword. Return `true` to match the option. Internal default filter method was [@laomao800/mark-match](https://github.com/laomao800/mark-match) .

### optionHeight

- type: Number
- default: 34

Each list item height. Use to calculate the virtual-list outside container viewport.

### optionsRemain

- type: Number
- default: 6

How many items should be shown in virtual-list viewport.

### optionsBench

- type: Number
- default: 6

How many items not show in virtual-list viewport but exist in real DOM.

## Events

| Events | Description                      |
| ------ | -------------------------------- |
| change | Trigger on binding value changed |

## Methods

| Methods               | Params                        | Description                                                               |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| setValue(filterFn)    | filterFn: (option) => boolean | Replace current binding values with the new values filtered by `filterFn` |
| addValue(filterFn)    | filterFn: (option) => boolean | Add values filtered by `filterFn` from the binding value                  |
| removeValue(filterFn) | filterFn: (option) => boolean | Remove values filtered by `filterFn` from the binding value               |
| reset()               | -                             | Clear binding values                                                      |

## Slots

### `option-template`

| Slot prop | info                              |
| --------- | --------------------------------- |
| option    | `optionsData` origin array item   |
| keyword   | Search keyword                    |
| selected  | Whether current item was selected |
