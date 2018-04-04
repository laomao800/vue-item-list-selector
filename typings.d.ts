import { Vue } from 'vue-property-decorator'
export default class ItemListSelector extends Vue {
  public data: object[]
  public usePage: number
  public pageSize: number
  public notFoundText: string
  public searchText: string
  public prevPageText: string
  public nextPageText: string
}
