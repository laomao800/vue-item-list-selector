<template>
  <div id="app">
    <h2>Multiple Selected - object</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector v-model="value1" :options-data="optionsData" />
      </div>
      <div class="result">{{ value1 }}</div>
    </div>

    <h2>Multiple Selected - value key</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector
          v-model="value2"
          label-key="label"
          value-key="value"
          :options-data="optionsData"
        />
      </div>
      <div class="result">{{ value2 }}</div>
    </div>

    <h2>Single Selected</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector
          v-model="value3"
          label-key="label"
          :options-data="optionsData"
          :multiple="false"
        />
      </div>
      <div class="result">{{ value3 }}</div>
    </div>

    <h2>String Options</h2>
    <div class="wrap">
      <div class="selector">
        <ItemListSelector
          v-model="value4"
          :options-data="strList"
          :multiple="false"
        />
      </div>
      <div class="result">{{ value4 }}</div>
    </div>
  </div>
</template>

<script>
import ItemListSelector from '../src'

function randomText(length = 20) {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
}

// const optionsData = getTestData()
const optionsData = Object.freeze(
  Array(6000)
    .fill()
    .map((v, i) => ({
      label: `${i} - ${randomText()}`,
      value: i
    }))
)

console.log(getTestData)
function getTestData() {
  return [
    { label: 'data-01', value: '01' },
    { label: 'data-02', value: '02' },
    { label: 'data-03', value: '03' },
    { label: 'data-04', value: '04' },
    { label: 'data-05', value: '05' },
    { label: 'data-06', value: '06' },
    { label: 'data-07', value: '07' },
    { label: 'data-08', value: '08' },
    { label: 'data-09', value: '09' },
    { label: 'data-10', value: '10' },
    { label: 'data-11', value: '11' },
    { label: 'data-12', value: '12' },
    { label: 'data-13', value: '13' },
    { label: 'data-14', value: '14' },
    { label: 'data-15', value: '15' },
    { label: 'data-16', value: '16' },
    { label: 'data-17', value: '17' },
    { label: 'data-18', value: '18' },
    { label: 'data-19', value: '19' },
    { label: 'data-20', value: '20' }
  ]
}

export default {
  name: 'App',

  components: { ItemListSelector },

  data: () => ({
    value1: [],
    value2: [1],
    value3: 1,
    value4: 'label-2',
    optionsData,
    strList: ['label-1', 'label-2', 'label-3']
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
