import Vue from 'vue'
import Component from 'vue-class-component'

import itemListSelector from '@/components/item-list-selector.vue'

@Component({
  components: { itemListSelector }
})
export default class App extends Vue {

}
