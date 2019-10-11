# item-list-selector [![Build Status](https://travis-ci.org/laomao800/vue-item-list-selector.svg?branch=master)](https://travis-ci.org/laomao800/vue-item-list-selector) [![codecov](https://codecov.io/gh/laomao800/vue-item-list-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/vue-item-list-selector) [![npm](https://img.shields.io/npm/v/@laomao800/vue-item-list-selector.svg)](https://www.npmjs.com/package/@laomao800/vue-item-list-selector)

## Install

```bash
# npm
npm install --save @laomao800/vue-item-list-selector

# yarn
yarn add @laomao800/vue-item-list-selector
```

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

## API

### Props

| Prop           | Type                   | Default                  |
| -------------- | ---------------------- | ------------------------ |
| value          | Function               | `[]`                     |
| optionsData    | Array/Function/Promise | `[]`                     |
| multiple       | Boolean                | `true`                   |
| loadingText    | String                 | `'Loading...'`           |
| notFoundText   | String                 | `'No results'`           |
| searchText     | String                 | `'Search'`               |
| splitKeyword   | Boolean                | `true`                   |
| matchTemplate  | Function               | t => `<mark>${t}</mark>` |
| labelKey       | String                 | `'label'`                |
| valueKey       | String                 | `undefined`              |
| filterMethod   | Function               | `undefined`              |
| optionTemplate | Function               | `undefined`              |
| optionHeight   | Number                 | 34                       |
| optionsRemain  | Number                 | 6                        |
| optionsBench   | Number                 | 6                        |

### Slots

#### `option-template`

| Slot prop | info                              |
| --------- | --------------------------------- |
| option    | `optionsData` origin array item   |
| keyword   | Search keyword                    |
| selected  | Whether current item was selected |
