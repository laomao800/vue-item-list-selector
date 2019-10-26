<template>
  <div class="wrap">
    <div>
      <item-list-selector
        v-model="value1"
        :options-data="optionsData"
        :multiple="false"
        label-key="label"
      />
      <br />
      value: {{ value1 }}
    </div>
    <div>
      <item-list-selector v-model="value2" :options-data="optionsData" label-key="label" />
      <br />
      value: {{ value2 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: null,
      value2: [],
      optionsData: [
        { label: 'label-1', value: 1 },
        { label: 'label-2', value: 2 },
        { label: 'label-3', value: 3 },
        { label: 'label-4', value: 4 },
        { label: 'label-5', value: 5 },
        { label: 'label-6', value: 6 },
        { label: 'label-7', value: 7 },
        { label: 'label-8', value: 8 }
      ]
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
}
.wrap > * {
  flex: 1;
  margin: 0 20px;
}
</style>
