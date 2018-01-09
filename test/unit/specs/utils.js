import Vue from 'vue/dist/vue.min.js'

export function getTestData () {
  return [
    { label: '小刘01', value: 30 },
    { label: '小张02', value: 20 },
    { label: '小刘03', value: 30 },
    { label: '小张04', value: 20 },
    { label: '小刘05', value: 30 },
    { label: '小张06', value: 20 },
    { label: '小刘07', value: 30 },
    { label: '小张08', value: 20 },
    { label: '小刘09', value: 30 },
    { label: '小张10', value: 20 },
    { label: '小刘11', value: 30 },
    { label: '小张12', value: 20 },
    { label: '小刘13', value: 30 },
    { label: '小张14', value: 20 },
    { label: '小刘15', value: 30 },
    { label: '小刘16', value: 30 },
    { label: '小刘17', value: 30 },
    { label: '小刘18', value: 30 },
    { label: '小刘19', value: 30 },
    { label: '小张20', value: 20 },
    { label: '小张21', value: 20 }
  ]
}

export function createViewModel (baseConfig) {
  const el = document.createElement('div')
  document.body.appendChild(el)

  return (config) => new Vue({
    el,
    ...baseConfig,
    ...config
  })
}
