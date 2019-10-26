import Vue, { VueConstructor } from 'vue'

type optionsArr = Array<any>
type doneCallback = (arr: optionsArr) => void

declare class Props extends Vue {
  /** Binding value */
  value: any

  /** Array of options */
  optionsData:
    | optionsArr
    | Promise<optionsArr>
    | ((done: doneCallback) => optionsArr | undefined)

  /** Multi-select mode */
  multiple: boolean

  /** Text display when async `optionsData` resolving data. */
  loadingText: string

  /** Text display when no matching search results. */
  notFoundText: string

  /** Search text input's Placeholder */
  searchText: string

  /** Whether to use space-separated keywords when searching. */
  splitKeyword: boolean

  /** Matching text formatter */
  matchTemplate: (text: string) => string

  /** Specify the label text property while `optionsData` item is an object. */
  labelKey: string

  /** Specify the binding `value/v-model` property while `optionsData` item is an object. */
  valueKey: string

  /** Custom option label format function */
  optionTemplate: (option: any) => string

  /** Custom item filter method */
  filterMethod: (option: any, keyword: string) => boolean

  /** Each list item height. Use to calculate the virtual-list outside container viewport. */
  optionHeight: number

  /** How many items should be shown in virtual-list viewport. */
  optionsRemain: number

  /** How many items not show in virtual-list viewport but exist in real DOM. */
  optionsBench: number
}

export default class ItemListSelector extends Props {
  static install(Vue: VueConstructor<Vue>, options: any): void
}
