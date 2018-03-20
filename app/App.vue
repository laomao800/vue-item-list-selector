<template>
  <div id='app'>
    <item-list-selector :data='listData' v-model='selected' :use-page='true'></item-list-selector>
    {{ selected }}
  </div>
</template>

<script>
  import itemListSelector from '@/components/item-list-selector.vue'

  export default {
    name: 'App',

    components: { itemListSelector },

    data: () => ({
      selected: [],
      listData: [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 }
      ]
    })
  }
</script>
