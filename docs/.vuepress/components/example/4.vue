<template>
  <div class="wrap">
    <div>
      <div style="text-align:center;">
        <button @click="loadOptions1">From promise</button>
        <button @click="() => optionsData1 = []">Reset</button>
      </div>
      <item-list-selector v-model="value1" :options-data="optionsData1" label-key="label" />
    </div>
    <div>
      <div style="text-align:center;">
        <button @click="loadOptions2">From callback</button>
        <button @click="() => optionsData2 = []">Reset</button>
      </div>
      <item-list-selector v-model="value2" :options-data="optionsData2" label-key="label" />
    </div>
    <div>
      <div style="text-align:center;">
        <button @click="loadOptions3">From async function</button>
        <button @click="() => optionsData3 = []">Reset</button>
      </div>
      <item-list-selector v-model="value3" :options-data="optionsData3" label-key="label" />
    </div>
  </div>
</template>

<script>
function randomText(length = 20) {
  return [...Array(length)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join('')
}

function genOptions(size = 8) {
  return Object.freeze(
    Array(size)
      .fill()
      .map((v, i) => ({
        label: randomText(),
        value: i
      }))
  )
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export default {
  data() {
    return {
      value1: [],
      value2: [],
      value3: [],
      optionsData1: null,
      optionsData2: null,
      optionsData3: null
    }
  },
  methods: {
    async loadOptions1() {
      this.optionsData1 = []
      await this.$nextTick()
      this.optionsData1 = new Promise(resolve => {
        setTimeout(() => {
          resolve(genOptions())
        }, 1000)
      })
    },
    async loadOptions2() {
      this.optionsData2 = []
      await this.$nextTick()
      this.optionsData2 = done => {
        setTimeout(() => {
          done(genOptions())
        }, 1000)
      }
    },
    async loadOptions3() {
      this.optionsData3 = []
      await this.$nextTick()
      this.optionsData3 = async () => {
        await sleep(1000)
        return genOptions()
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  height: 300px;
}
.wrap > * {
  flex: 1;
  margin: 0 20px;
}
</style>
