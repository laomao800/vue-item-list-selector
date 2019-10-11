import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import less from 'rollup-plugin-less'
import url from 'postcss-url'
import autoprefixer from 'autoprefixer'

const version = process.env.VERSION || require('./package.json').version
const banner =
  '/**\n' +
  ' * @preserve\n' +
  ` * @laomao800/vue-item-list-selector v${version}\n` +
  ' */'

const commonConfig = {
  input: 'src/index.js',
  external: ['vue'],
  plugins: [
    resolve(),
    commonjs(),
    less(),
    vue({
      style: {
        trim: false,
        postcssPlugins: [url({ url: 'inline' }), autoprefixer()]
      }
    }),
    buble()
  ]
}

export default [
  {
    ...commonConfig,
    output: {
      format: 'cjs',
      file: 'dist/vue-item-list-selector.common.js',
      banner
    }
  },
  {
    ...commonConfig,
    output: {
      format: 'umd',
      globals: { vue: 'Vue' },
      file: 'dist/vue-item-list-selector.umd.js',
      name: 'vue-item-list-selector',
      banner
    }
  },
  {
    ...commonConfig,
    output: {
      format: 'umd',
      globals: { vue: 'Vue' },
      file: 'dist/vue-item-list-selector.umd.min.js',
      name: 'vue-item-list-selector',
      banner
    },
    plugins: [
      ...commonConfig.plugins,
      uglify({
        output: {
          // https://github.com/TrySound/rollup-plugin-uglify#comments
          comments: function (node, comment) {
            if (comment.type === 'comment2') {
              return /@preserve|@license|@cc_on/i.test(comment.value)
            }
            return false
          }
        }
      })
    ]
  }
]
