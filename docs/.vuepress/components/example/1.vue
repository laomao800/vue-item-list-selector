<template>
  <div>
    value: {{ value }}
    <br />
    <item-list-selector v-model="value" :options-data="optionsData" style="width:320px;" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ['label-2'],
      optionsData: [
        'label-1',
        'label-2',
        'label-3',
        'label-4',
        'label-5',
        'label-6',
        'label-7',
        'label-8'
      ]
    }
  }
}
</script>
