import Vue, { VueConstructor } from 'vue'

declare class Props extends Vue {
  /** 所有待选数据 */
  data: object[]

  /** 是否多选 */
  multiple: boolean

  /** 选中值，可通过 v-model 绑定 */
  selection: object[]

  /** 无筛选结果提示文字 */
  notFoundText: string

  /** 搜索输入框占位文字 */
  searchText: string

  /** 自定义选项展示模板 */
  optionTemplate: (option: any) => string

  /** 选项样式高度 */
  optionHeight: number

  /** 默认显示选项数量 */
  optionsRemain: number

  /** 虚拟滚动效果屏幕外选项数量 */
  optionsBench: number
}

export default class ItemListSelector extends Props {
  static install(Vue: VueConstructor<Vue>, options: any): void
}
