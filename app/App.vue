<template>
  <div id="app">
    {{ selected }}
    <item-list-selector :data="listData" v-model="selected" :use-page="true">
      <div slot="option" slot-scope="props">
        <div><strong>label:</strong><span>{{ props.item.label }}</span></div>
        <div><strong>value:</strong><span>{{ props.item.value }}</span></div>
      </div>
    </item-list-selector>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import itemListSelector from '@/components/item-list-selector.vue'

  @Component({
    components: { itemListSelector }
  })
  export default class App extends Vue {
    listData = [
    { label: '小刘00', value: '00' },
    { label: '小张01', value: '01' },
    { label: '小刘02', value: '02' },
    { label: '小张03', value: '03' },
    { label: '小刘04', value: '04' },
    { label: '小张05', value: '05' },
    { label: '小刘06', value: '06' },
    { label: '小张07', value: '07' },
    { label: '小刘08', value: '08' },
    { label: '小张09', value: '09' },
    { label: '小刘10', value: '10' },
    { label: '小张11', value: '11' },
    { label: '小刘12', value: '12' },
    { label: '小张13', value: '13' },
    { label: '小刘14', value: '14' },
    { label: '小刘15', value: '15' },
    { label: '小刘16', value: '16' },
    { label: '小刘17', value: '17' },
    { label: '小刘18', value: '18' },
    { label: '小张19', value: '19' },
    { label: '小张20', value: '20' }
    ]
    selected = []
  }
</script>
