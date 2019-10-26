<template>
  <div>
    value: {{ value }}
    <br />
    <br />
    <select-wrapper
      v-model="value"
      :multiple="true"
      placeholder="Select Items"
      style="width:320px;"
      @visible-change="onVisibleChange"
    >
      <template #value-template="{ value }">{{ value }}</template>
      <item-list-selector
        ref="itemListSelector"
        v-model="value"
        :options-data="optionsData"
        value-key="value"
      />
    </select-wrapper>
  </div>
</template>

<script>
function _randomText(length = 20) {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export default {
  data() {
    return {
      value: [1, 3, 5],
      optionsData: Array(6000)
        .fill()
        .map((v, i) => ({
          label: `${i} - ${_randomText(6)}`,
          value: i
        }))
    }
  },

  methods: {
    onVisibleChange(visible) {
      if (visible) {
        this.$nextTick().then(() => {
          this.$refs.itemListSelector.$el
            .querySelector('.item-selector__searchbar input')
            .focus()
        })
      }
    }
  }
}
</script>
