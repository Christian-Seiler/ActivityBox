import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vite'
import { VitePluginNode, VitePluginNodeConfig } from 'vite-plugin-node'

const nodeConfig: VitePluginNodeConfig = {
  appPath: './src/main.ts',
  adapter: 'nest',
  appName: 'ActivityBox',
  tsCompiler: 'swc',
  swcOptions: {
    sourceMaps: true
  }
}

export default defineConfig(() => ({
  root: __dirname,
  build: {
    emptyOutDir: true
  },
  plugins: [...VitePluginNode(nodeConfig), nxViteTsPaths()],
  optimizeDeps: {
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger'
    ]
  }
}))
