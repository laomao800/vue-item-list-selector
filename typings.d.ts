import { Vue } from 'vue-property-decorator'
export default class ItemListSelector extends Vue {
  data: object[]
  usePage: number
  pageSize: number
  notFoundText: string
  searchText: string
  prevPageText: string
  nextPageText: string
}
