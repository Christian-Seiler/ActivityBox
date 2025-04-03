import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  root: __dirname,
  plugins: [
    nxViteTsPaths(),
    VitePluginNode({
      appPath: './src/index.ts',
      exportName: undefined,
      outputFormat: 'esm',
      adapter: 'nest',
      tsCompiler: 'swc',
      swcOptions: { sourceMaps: true }
    })
  ],
  builder: {},
  build: {
    emptyOutDir: true
  }
})
