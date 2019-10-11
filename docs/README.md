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

可通过 `label-key` 设置使用哪个属性展示为属性文本。若单一属性不满足，可通过 Prop `option-template` 进行自定义返回文本。

若要自定义选项结构，可通过 slot `option-template` 设置自定义结构，注意通过这种方式设置的选项不带有搜索关键字高亮效果，需自行通过插槽 Prop 提供的 `option` 与 `keyword` 属性自行实现，另外可通过 `selected` 判断是否为选中项。

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

</client-only>

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

| Slot prop | info                               |
| --------- | ---------------------------------- |
| option    | `optionsData` 单条选项的原始数据项 |
| keyword   | 当前搜索关键字                     |
| selected  | 当条选项是否为选中状态             |
