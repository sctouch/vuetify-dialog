import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-porter'
import minimist from 'minimist'

import { terser } from 'rollup-plugin-terser'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'VuetifyDialog',
    exports: 'named',
    globals: {
      vue: 'Vue',
      vuedl: 'Vuedl',
      'vuetify/lib': 'Vuetify'
    }
  },
  external: ['vue', 'vuedl', 'vuetify/lib'],
  plugins: [
    vue({
      css: false,
      compileTemplate: true
    }),
    css({ dest: 'dist/vuetify-dialog.css' }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    buble({
      objectAssign: 'Object.assign',
      transforms: { asyncAwait: false }
    })
  ]
}

if (argv.format === 'iife') {
  // config.plugins.push()
  config.plugins.push(terser())
}
export default config
