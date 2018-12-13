<template>
  <div id="app">
    <h2>Multiple Selected</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector v-model="multipleSelected" :data="listData" />
      </div>
      <div class="result">{{ multipleSelected }}</div>
    </div>

    <h2>Single Selected</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector v-model="singleSelected" :data="listData" :multiple="false" />
      </div>
      <div class="result">{{ singleSelected }}</div>
    </div>
  </div>
</template>

<script>
import ItemListSelector from '../src'

function randomText(length = 20) {
  return [...Array(length)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  name: 'App',

  components: { ItemListSelector },

  data: () => ({
    singleSelected: [],
    multipleSelected: [],
    listData: Array(6000)
      .fill()
      .map((v, i) => ({
        label: `${i} - ${randomText()}`,
        value: i
      }))
  })
}
</script>

<style>
.wrap {
  display: flex;
}
.selector {
  width: 300px;
}
.result {
  white-space: pre-wrap;
  margin-left: 20px;
  height: 220px;
  overflow: auto;
  padding: 10px;
  flex: 1;
  font-size: 12px;
  border: 1px solid #eee;
}
</style>
