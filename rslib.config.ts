// eslint-disable-next-line import/no-extraneous-dependencies
import { pluginReact } from '@rsbuild/plugin-react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
})
