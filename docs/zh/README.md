---
sidebar: auto
---

# Vue item list selector

## 演示

### 支持多选与单选

<client-only>

<demo-box title="单选/多选">

通过 `multiple` 切换选择模式。多选模式下 `value/v-model` 需为数组格式。

<example-0 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/0.vue

</div>

</demo-box>

### 基础数据类型

<demo-box title="基础数据类型">

若传入基础数据类型会自动生成选项数据。

**另外搜索功能支持空格分隔关键字，试试输入 _lab 2_**

<example-1 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/1.vue

</div>

</demo-box>

### 自定义选项格式

<demo-box title="自定义选项格式">

可通过 `label-key` 设置使用哪个属性展示为属性文本。

若要自定义选项结构，可通过 slot `option-template` 设置自定义结构，注意通过这种方式设置的选项不带有搜索关键字高亮效果，需自行通过插槽 Prop 提供的 `option` 与 `keyword` 属性自行实现。

**注意：搜索结果是通过匹配 `label-key` 或 Prop `option-template` 最终返回值是否包含关键字作为搜索命中条件。因此通过 slot 设置自定义选项格式的时候，依然可设置这 2 个属性提供给搜索功能使用。**

<example-2 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/2.vue

</div>

</demo-box>

### 自定义选中值

<demo-box title="自定义选中值">

通过 `value-key` 设置使用哪个属性作为选中值，若不传会获取到单个选项的完整 Object 数据。

若有设置该 Prop ，会将当前 v-model 内绑定的基础类型数据尝试进行识别，可用于要对组件设置默认值的场景。

<example-3 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/3.vue

</div>

</demo-box>

### 异步选项

<demo-box title="异步选项">

`optionsData` 支持多种异步方式填充数据。

<example-4 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/4.vue

</div>

</demo-box>

### 与其他组件配合

<demo-box title="与其他组件配合">

与 [vue-select-wrapper](https://github.com/laomao800/vue-select-wrapper) 配合使用。

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

组件绑定值，多选模式下需要为 Array 。

### optionsData

- type: Array/Promise/Function
- default: `[]`

选项数据，子项为 object 类型时候，可配合 `labelKey` 与 `valueKey` 配置选项文本属性和要提交给 value 的属性。

为 Function 类型时，可直接 return 数据，或使用接受参数内的回调函数响应：

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

是否多选模式。

### loadingText

- type: String
- default: `'Loading...'`

如果 `optionsData` 为异步方式时，加载时的显示文本。

### notFoundText

- type: String
- default: `'No results'`

未搜索到匹配数据时的显示文本。

### searchText

- type: String
- default: `'Search'`

显示在搜索框的 Placeholder 。

### splitKeyword

- type: Boolean
- default: `true`

搜索时是否通过空格拆分进行多关键字匹配。

### matchTemplate

- type: Function
- default: t => \`&lt;mark&gt;${t}&lt;/mark&gt;\`

搜索匹配时的文本格式化方法。

### labelKey

- type: String
- default: `'label'`

若 `optionsData` 子项为 object 类型，通过该属性配置选项显示文本。若没有配置 `optionTemplate` 的话，其对应的结果还会作为搜索功能的搜索文本。

### valueKey

- type: String
- default: `undefined`

若 `optionsData` 子项为 object 类型，通过该属性配置要绑定给 `value/v-model` 的值。默认会提交整个对象，通过该属性也可实现默认值的绑定：

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

选项文本格式化方法，该方法必须返回字符串，返回内容也会作为搜索功能的搜索文本。

若要自定义选项 html 内容，请使用 slot [option-template](#option-template) 。

### filterMethod

- type: Function
- default: `undefined`
- params: (option, keyword)

自定义搜索方法，参数 `option` 为选项单项子项， `keyword` 为当前搜索关键字，返回 `true` 即表示命中。内部默认匹配方式为 [@laomao800/mark-match](https://github.com/laomao800/mark-match)。

### optionHeight

- type: Number
- default: `34`

每个选项样式高度，用于虚拟滚动效果计算。

### optionsRemain

- type: Number
- default: `6`

默认显示选项数量。

### optionsBench

- type: Number
- default: `6`

虚拟滚动效果屏幕外选项数量。

## Events

| Events         | Description                  |
| -------------- | ---------------------------- |
| change         | 绑定值改变时触发             |
| options-inited | `optionsData` 加载完成时触发 |

## Methods

| Methods               | Params                        | Description                            |
| --------------------- | ----------------------------- | -------------------------------------- |
| setValue(filterFn)    | filterFn: (option) => boolean | 用 `filterFn` 过滤的新值替换当前绑定值 |
| addValue(filterFn)    | filterFn: (option) => boolean | 从绑定值内添加由 `filterFn` 过滤的值   |
| removeValue(filterFn) | filterFn: (option) => boolean | 从绑定值内删除由 `filterFn` 过滤的值   |
| reset()               | -                             | 清空绑定值                             |

## Slots

### `option-template`

| Slot prop | Info                               |
| --------- | ---------------------------------- |
| option    | `optionsData` 单条选项的原始数据项 |
| keyword   | 当前搜索关键字                     |
| selected  | 当条选项是否为选中状态             |
