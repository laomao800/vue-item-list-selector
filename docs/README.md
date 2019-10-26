---
sidebar: auto
---

# Vue item list selector

## Example

### Single/Multiple select

<client-only>

<demo-box title="Single/Multiple">

The value should be an array when multi-select mode.

<example-0 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/0.vue

</div>

</demo-box>

### Primitive values

<demo-box title="Primitive values">

Primitive values will automatically use as the label and value.

**Filter method supports space-separated keywords by default, try typing _lab 2_**

<example-1 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/1.vue

</div>

</demo-box>

### Custom label text

<demo-box title="Custom label text">

Use the `value-key` to set which property to use as the selected value.

You can set the custom option html through slot `option-template`. Note that the options set in this way do not have the search keyword highlighting effect. You need to use the slot Prop `option` and `keyword` to make by yourself.

**Note: The filter method search result is by matching `label-key` or prop `option-template` whether the final return value contains a keyword as a search hit condition. Therefore, when setting the custom option format through the slot, these two props can still be set for use by the filter method. **

<example-2 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/2.vue

</div>

</demo-box>

### Custom value

<demo-box title="Custom value">

Use the `value-key` to set which property to use as the selected value. If not, it will get the origin object by default.

While this prop was present, the `v-model` will try to filter the matching options as the default value.

<example-3 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/3.vue

</div>

</demo-box>

### async optionsData

<demo-box title="async optionsData">

`optionsData` could also be a Promise/Function

<example-4 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/4.vue

</div>

</demo-box>

### Work with vue-select-wrapper

<demo-box title="Work with vue-select-wrapper" :js-res="['//unpkg.com/@laomao800/vue-select-wrapper@1.x/dist/vue-select-wrapper.umd.min.js']">

Work with [vue-select-wrapper](https://github.com/laomao800/vue-select-wrapper)

<example-5 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/5.vue

</div>

</demo-box>

</client-only>

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
- default: `34`

Each list item height. Use to calculate the virtual-list outside container viewport.

### optionsRemain

- type: Number
- default: `6`

How many items should be shown in virtual-list viewport.

### optionsBench

- type: Number
- default: `6`

How many items not show in virtual-list viewport but exist in real DOM.

## Slots

### `option-template`

| Slot prop | info                              |
| --------- | --------------------------------- |
| option    | `optionsData` origin array item   |
| keyword   | Search keyword                    |
| selected  | Whether current item was selected |
